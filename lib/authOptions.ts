import { api } from "@/services/api";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "user-login",
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req
      ) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const res = await api.loginUser(
            credentials.email,
            credentials.password
          );

          if (res.kind === "ok") {
            const { token } = res.data;
            const userResponse: any = await api.getUserDetails(token);
            return { ...userResponse?.data, token };
          } else {
            const errorMessage =
              res?.message || res?.data?.message || "Failed to authenticate";
            throw new Error(errorMessage);
          }
        } catch (error: any) {
          console.error("Authentication error:", error.message);
          throw new Error(
            error.message || "Authentication failed. Please try again."
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && (session?.name || session?.orgRole)) {
        token.name = session.name;
        token.orgRole = session.orgRole;
      }
      user && (token.user = user);
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      // session.token = token?.user?.token;
      if (token?.name) {
        session.user.name = token.name;
      }
      if (token?.orgRole) {
        session.user.orgRole = token.orgRole;
      }

      return session;
    },
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
