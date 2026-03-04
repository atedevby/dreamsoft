import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE_NAME = "dreamsoft_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

function getEnvValue(name: string, fallback: string) {
  return process.env[name] ?? fallback;
}

function getSecret() {
  return getEnvValue("AUTH_SECRET", "change-this-secret");
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function createToken(login: string) {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${login}:${expiresAt}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

function verifyToken(token: string) {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [login, expiresAtRaw, signature] = decoded.split(":");

    if (!login || !expiresAtRaw || !signature) {
      return false;
    }

    const payload = `${login}:${expiresAtRaw}`;
    const expected = sign(payload);

    const valid = timingSafeEqual(
      Buffer.from(signature, "utf8"),
      Buffer.from(expected, "utf8"),
    );

    if (!valid) {
      return false;
    }

    return Number(expiresAtRaw) > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  return verifyToken(token);
}

export async function requireAdminAuth() {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) {
    redirect("/admin/login");
  }
}

export async function loginWithEnvCredentials(login: string, password: string) {
  const adminLogin = getEnvValue("ADMIN_LOGIN", "admin");
  const adminPassword = getEnvValue("ADMIN_PASSWORD", "admin123");

  if (login !== adminLogin || password !== adminPassword) {
    return false;
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createToken(login), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return true;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
