import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const muerpSession = cookieStore.get("muerp_session");
    const muerpUsername = cookieStore.get("muerp_username");

    if (!muerpSession?.value || !muerpUsername?.value) {
      return NextResponse.json(
        { error: "Missing required cookies or session expired" },
        { status: 400 }
      );
    }

    const cookieData = {
      cookies: `muerp_session=${muerpSession.value}`,
      username: muerpUsername.value,
    };

    const backendResponse = await fetch(
      "https://mucalsync-backend-b6bfaf9878eb.herokuapp.com/api/timetable",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cookieData),
      }
    );

    const responseData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: responseData.detail || "Failed to fetch timetable" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Timetable fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch timetable" },
      { status: 500 }
    );
  }
}
