export const publicRoutes = ["/", "/auth/new-verifcation"];

/**
 * An array of routes that are used for authetication
 * These routes will redirect logged-in users to /settings
 * @type {string[]}
 **/
export const authRoutes: string[] = ["/auth/login", "/auth/register", "/auth/error", "/auth/reset", "/auth/new-password"];

/**
 * The prefix for API authentication routes that start with this prefix are used for
 * API authentication purpose
 * @type {string}
 **/
export const apiAuthPrefix: string = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
