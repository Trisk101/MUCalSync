import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const cookieStore = cookies();
    const baseUrl = "https://mucalsync-backend-b6bfaf9878eb.herokuapp.com";

    // First get the login page
    const initialResponse = await fetch(baseUrl, {
      method: "GET",
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const initialCookies = initialResponse.headers.get("set-cookie");

    // Attempt login
    const loginResponse = await fetch(`${baseUrl}/j_spring_security_check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: initialCookies || "",
        Origin: baseUrl,
        Referer: `${baseUrl}/login.htm`,
      },
      body: new URLSearchParams({
        j_username: username,
        j_password: password,
      }).toString(),
      redirect: "manual",
    });

    const location = loginResponse.headers.get("location");
    const sessionCookie = loginResponse.headers.get("set-cookie");

    console.log("Complete Login Response:", {
      status: loginResponse.status,
      headers: Object.fromEntries(loginResponse.headers.entries()),
      location,
      sessionCookie,
    });

    if (location?.includes("error")) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    } else if (location && sessionCookie) {
      const jsessionid = sessionCookie.match(/JSESSIONID=([^;]+)/)?.[1];
      console.log("Extracted JSESSIONID:", jsessionid);

      if (!jsessionid) {
        return NextResponse.json(
          { error: "No session ID found" },
          { status: 500 }
        );
      }

      // Create response
      const response = NextResponse.json({
        success: true,
        message: "Successfully logged in",
      });

      // Set both MUERP session and username cookies
      response.cookies.set("muerp_session", jsessionid, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      response.cookies.set("muerp_username", username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ error: "Unexpected response" }, { status: 500 });
  } catch (error) {
    console.error("MUERP login error:", error);
    return NextResponse.json(
      { error: "Authentication failed. Please try again later." },
      { status: 500 }
    );
  }
}
