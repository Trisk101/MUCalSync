import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import https from "https";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();

    // Get both MUERP cookies
    const muerpSession = cookieStore.get("muerp_session");
    const muerpUsername = cookieStore.get("muerp_username");

    console.log("Cookies available:", {
      session: muerpSession?.value,
      username: muerpUsername?.value,
      allCookies: request.headers.get("cookie"),
    });

    if (!muerpSession?.value || !muerpUsername?.value) {
      return NextResponse.json(
        { error: "Missing required cookies or session expired" },
        { status: 400 }
      );
    }

    const cookieData = {
      cookies: muerpSession.value,
      username: muerpUsername.value,
    };

    console.log("Making backend request with:", cookieData);

    const backendResponse = await fetch(
      "https://mucalsync-backend-b6bfaf9878eb.herokuapp.com/api/timetable",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Cookie: `JSESSIONID=${muerpSession.value}`,
        },
        body: JSON.stringify(cookieData),
        // @ts-ignore
        agent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    );

    // Log complete response
    const responseData = await backendResponse.json();
    console.log("Complete Timetable Response:", {
      status: backendResponse.status,
      headers: Object.fromEntries(backendResponse.headers.entries()),
      data: responseData,
    });

    // Handle different response statuses
    if (backendResponse.status === 401) {
      return NextResponse.json(
        { error: "Session expired. Please login again." },
        { status: 401 }
      );
    }

    if (backendResponse.status === 404) {
      return NextResponse.json(
        { error: "Timetable not found" },
        { status: 404 }
      );
    }

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      console.error("Backend error response:", {
        status: backendResponse.status,
        data: errorData,
      });

      return NextResponse.json(
        {
          error: errorData.detail || "Failed to fetch timetable",
          details: errorData,
        },
        { status: backendResponse.status }
      );
    }

    // Validate timetable data
    if (!responseData.timetable || !Array.isArray(responseData.timetable)) {
      console.error("Invalid timetable data received:", responseData);
      return NextResponse.json(
        { error: "Invalid timetable data received" },
        { status: 500 }
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Timetable fetch error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch timetable",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
