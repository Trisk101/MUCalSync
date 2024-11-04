import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: "https://mucalsync.duckdns.org/api/auth/google/callback",
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenResponse.json();

    // Store tokens securely (implement your storage method)

    // Redirect to frontend with success
    return NextResponse.redirect("https://mucalsync.duckdns.org/auth/success");
  } catch (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.redirect("https://mucalsync.duckdns.org/auth/error");
  }
}
