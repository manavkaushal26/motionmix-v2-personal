import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { config } from "./globalConfig";

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
          const res = await fetch(`${config.apiBaseUrl}/v1/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          if (res.ok) {
            const { token = "" } = data;
            const userResponse = await fetch(
              `${config.apiBaseUrl}/v1/user/me`,
              { method: "GET", headers: { token } }
            );
            const user = await userResponse.json();
            return { ...user, token };
          } else {
            const errorMessage = data?.message || "Failed to authenticate";
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
