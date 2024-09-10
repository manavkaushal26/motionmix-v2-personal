/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/pricing"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to DEFAULT_LOGIN_REDIRECT
 * @type {string[]}
 */
export const authRoutes = [
  "/signin",
  "/signup",
  "/password",
  "/forgot-password",
];

/**
 * The prefix for api authentication routes.
 * Routes that starts with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after user is logged in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
