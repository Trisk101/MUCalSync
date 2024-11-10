import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      accessToken(arg0: string, accessToken: any): unknown;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}
