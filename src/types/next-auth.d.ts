import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}
