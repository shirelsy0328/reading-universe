import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "theory-desk-admin";

const COOKIE_NAME = ADMIN_COOKIE_NAME;

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.AUTH_SECRET ?? "dev-admin-secret";
}

function createSessionToken(): string {
  return createHmac("sha256", getSessionSecret()).update("theory-desk-admin").digest("hex");
}

export function getAdminSessionToken(): string {
  return createSessionToken();
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return false;
  }

  return email.trim().toLowerCase() === adminEmail && password === adminPassword;
}

export async function createAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionToken(), getAdminCookieOptions());
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    const expected = Buffer.from(createSessionToken(), "utf-8");
    const received = Buffer.from(token, "utf-8");
    if (expected.length !== received.length) return false;
    return timingSafeEqual(expected, received);
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<void> {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    throw new Error("UNAUTHORIZED");
  }
}
