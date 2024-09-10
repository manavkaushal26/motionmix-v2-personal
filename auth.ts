import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { config } from "./lib/globalConfig";
import api from "./lib/services/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "user-login",
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Missing credentials");
        }
        try {
          const res = await api.post(
            "/v1/auth/login",
            { email, password },
            { headers: { "Content-Type": "application/json" } }
          );

          if (res.status <= 301) {
            const { token = "" } = res.data;
            const userRes = await api.get(`${config.apiBaseUrl}/v1/user/me`, {
              headers: { token },
            });

            return { ...userRes.data, token };
          } else {
            throw new Error(res?.data?.message);
          }
        } catch (error: any) {
          console.log({ error });
          throw new Error(
            JSON.stringify({
              error: error?.response?.data?.message || "Something went wrong",
              status: false,
            })
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig);
