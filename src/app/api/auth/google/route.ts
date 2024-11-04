import { NextResponse } from "next/server";

export async function GET() {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const REDIRECT_URI = "https://mucalsync.duckdns.org/api/auth/google/callback";
  //const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI_DEV;

  if (!GOOGLE_CLIENT_ID) {
    console.error("Missing GOOGLE_CLIENT_ID environment variable");
    return NextResponse.json({ error: "Configuration error" }, { status: 500 });
  }

  const googleAuthUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=https://www.googleapis.com/auth/calendar` +
    `&access_type=offline` +
    `&prompt=consent`;

  return NextResponse.json({ url: googleAuthUrl });
}
