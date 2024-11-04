import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const baseUrl = "https://muerp.mahindrauniversity.edu.in";

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

    const cookies = initialResponse.headers.get("set-cookie");

    // Attempt login
    const loginResponse = await fetch(`${baseUrl}/j_spring_security_check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookies || "",
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

    console.log("Login Response Headers:", loginResponse.headers);
    console.log("Session Cookie:", sessionCookie);

    if (location?.includes("error")) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    } else if (location && sessionCookie) {
      // Parse the JSESSIONID from the cookie string
      const jsessionid = sessionCookie.match(/JSESSIONID=([^;]+)/)?.[1];
      console.log("Extracted JSESSIONID:", jsessionid);

      return NextResponse.json({
        success: true,
        cookies: jsessionid, // Send just the JSESSIONID value
      });
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
