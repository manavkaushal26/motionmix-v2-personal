import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    authToken?: string;
    user: {
      role?: string;
      isAdmin?: boolean;
      isActive?: boolean;
      organization?: string;
      point?: number;
      orgRole?: string;
      createdAt?: string;
      updatedAt?: string;
      _id?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
    jwt?: string;
  }
}
