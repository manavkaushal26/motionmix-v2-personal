"use server";

import { signIn as naSignIn } from "@/auth";
import { SignInDataSchema, SignInSchema } from "@/components/forms/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const signIn = async (values: SignInDataSchema) => {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await naSignIn("user-login", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error: any) {
    console.log({ error });
    const message =
      (error?.cause?.err?.message &&
        JSON.parse(error.cause.err.message).error) ||
      error?.message;
    
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: message || "CredentialsError" };
        default:
          return { error: message || "Something went wrong!" };
      }
    }

    throw error; // We need to throw the error, otherwise it does not redirect us to DEFAULT_LOGIN_REDIRECT
  }
};
