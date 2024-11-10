import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          scope:
            "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Check if we got the calendar scope
        if (
          !account.scope?.includes("https://www.googleapis.com/auth/calendar")
        ) {
          return "/auth/error?error=AccessDenied";
        }
        try {
          // After successful Google sign-in, sync the calendar
          const response = await fetch("/api/calendar/sync", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${account.access_token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            return false;
          }

          return true;
        } catch (error) {
          console.error("Calendar sync error:", error);
          return "/auth/error?error=CalendarSyncFailed";
        }
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};
