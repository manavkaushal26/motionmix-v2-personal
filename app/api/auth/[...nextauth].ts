import { api } from "@utils/api";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "user-login",
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;
          const res: any = await api.post("/v1/auth/login", {
            email,
            password,
          });
          const { status, data } = res;

          if (status < 300) {
            const { token } = data;
            if (token) {
              const userResponse: any = await api.get(
                "/v1/user/me",
                undefined,
                {
                  headers: { token },
                }
              );

              return { ...userResponse?.data, token };
            } else {
              return { token };
            }
          } else {
            throw new Error(res?.data?.message || "Failed to authenticate");
          }
        } catch (error) {
          console.error("Authentication error: " + error.message);
          throw new Error(error?.message);
        }
      },
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    //   profile: async (profile, tokens) => {
    //     const { access_token = "" } = tokens;
    //     const res = await fetcher({
    //       endPoint: "/auth/login/oauth",
    //       method: "POST",
    //       body: {
    //         data: {
    //           provider: "facebook",
    //           token: access_token,
    //         },
    //       },
    //     });
    //     const { data, statusCode } = res;
    //     if (statusCode < 300) {
    //       const { user = {}, token } = data;
    //       return { ...user, token };
    //     }
    //   },
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    //   profile: async (profile, tokens) => {
    //     const { id_token = "" } = tokens;
    //     const res = await fetcher({
    //       endPoint: "/auth/login/oauth",
    //       method: "POST",
    //       body: {
    //         data: {
    //           provider: "google",
    //           token: id_token,
    //         },
    //       },
    //     });
    //     const { data, statusCode } = res;
    //     if (statusCode < 300) {
    //       const { user = {}, token } = data;
    //       return { ...user, token };
    //     }
    //   },
    // }),
  ],
  pages: {
    signIn: "/login",
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
      session.token = token?.user?.token;
      if (token?.name) {
        session.user.name = token.name;
      }
      if (token?.orgRole) {
        session.user.orgRole = token.orgRole;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
