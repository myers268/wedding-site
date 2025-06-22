import { createCookieSessionStorage } from "react-router";
import type { Session } from "react-router";

// Session data types
export interface SessionData {
  guestId: string;
}

export interface SessionFlashData {
  error: string;
}

export type AppSession = Session<SessionData, SessionFlashData>;

// Create session storage with cookie configuration
export function createSessionStorage(env?: {
  NODE_ENV?: string;
  SESSION_SECRET?: string;
}) {
  return createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "wedding_session",
      secure: env?.NODE_ENV === "production",
      secrets: [
        env?.SESSION_SECRET || "fallback-secret-key-change-in-production",
      ],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 14, // 2 weeks in seconds
      httpOnly: true,
    },
  });
}

// Default session storage for non-Cloudflare environments
export const sessionStorage = createSessionStorage();

// Helper functions for session management
export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function commitSession(session: AppSession) {
  return sessionStorage.commitSession(session);
}

export async function destroySession(session: AppSession) {
  return sessionStorage.destroySession(session);
}

// User session helpers
export async function createUserSession(request: Request, guestId: string) {
  const session = await getSession(request);
  session.set("guestId", guestId);
  return commitSession(session);
}

export async function getUserSession(request: Request) {
  const session = await getSession(request);
  const guestId = session.get("guestId");
  return guestId;
}

export async function requireUserSession(request: Request) {
  const guestId = await getUserSession(request);
  if (!guestId) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return guestId;
}

export async function destroyUserSession(request: Request) {
  const session = await getSession(request);
  return destroySession(session);
}
