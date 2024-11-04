import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log the incoming request (sanitize sensitive data)
    console.log("Timetable request for user:", body.username);

    // Validate required fields
    if (!body.cookies || !body.username) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create cookie object as expected by backend
    const cookieData = {
      cookies: body.cookies, // JSESSIONID string
      username: body.username,
    };

    // Make request to backend
    const backendResponse = await fetch("http://localhost:8000/api/timetable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(cookieData),
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

    const data = await backendResponse.json();

    // Validate timetable data
    if (!data.timetable || !Array.isArray(data.timetable)) {
      console.error("Invalid timetable data received:", data);
      return NextResponse.json(
        { error: "Invalid timetable data received" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    // Log the full error for debugging
    console.error("Timetable fetch error:", error);

    // Return a user-friendly error
    return NextResponse.json(
      {
        error: "Failed to fetch timetable",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
