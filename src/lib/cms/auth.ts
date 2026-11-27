import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getCmsEnv } from "./env";

export const SESSION_COOKIE_NAME = "rayonix_cms_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) {
    bin += String.fromCharCode(bytes[i]);
  }
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(str: string): Uint8Array {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

async function sha256(text: string): Promise<Uint8Array> {
  const buf = await crypto.subtle.digest("SHA-256", encoder.encode(text));
  return new Uint8Array(buf);
}

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.trim().toLowerCase();
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

/**
 * Validates that a password meets strong-password requirements:
 * >= 12 chars, uppercase, lowercase, digit, and symbol.
 */
export function isStrongPassword(pw: string): boolean {
  return (
    pw.length >= 12 &&
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw)
  );
}

/**
 * Verifies the supplied password against ADMIN_PASSWORD_HASH (PBKDF2 or SHA-256)
 * or ADMIN_PASSWORD using constant-time comparison.
 */
export async function verifyAdminPassword(candidate: string): Promise<{ ok: boolean; error?: string }> {
  const env = getCmsEnv();
  const hashSpec = env.ADMIN_PASSWORD_HASH?.trim();
  const plain = env.ADMIN_PASSWORD?.trim();

  if (!hashSpec && !plain) {
    return {
      ok: false,
      error: "Admin authentication is not configured. Set ADMIN_PASSWORD (or ADMIN_PASSWORD_HASH) in environment variables.",
    };
  }

  if (hashSpec) {
    // Format: pbkdf2$iterations$saltHex$hashHex
    if (hashSpec.startsWith("pbkdf2$")) {
      const parts = hashSpec.split("$");
      if (parts.length !== 4) return { ok: false, error: "Invalid ADMIN_PASSWORD_HASH format." };
      const iterations = Number(parts[1]);
      const salt = hexToBytes(parts[2]);
      const expected = hexToBytes(parts[3]);
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(candidate),
        "PBKDF2",
        false,
        ["deriveBits"]
      );
      const derived = await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt: salt.buffer as ArrayBuffer, iterations, hash: "SHA-256" },
        keyMaterial,
        expected.length * 8
      );
      return { ok: timingSafeEqual(new Uint8Array(derived), expected) };
    }
    // Plain SHA-256 hex digest
    const candidateDigest = await sha256(candidate);
    const expected = hexToBytes(hashSpec);
    return { ok: timingSafeEqual(candidateDigest, expected) };
  }

  if (plain) {
    const [a, b] = await Promise.all([sha256(candidate), sha256(plain)]);
    return { ok: timingSafeEqual(a, b) };
  }

  return { ok: false };
}

async function getSigningKey(): Promise<CryptoKey | null> {
  const env = getCmsEnv();
  const secret = env.ADMIN_SESSION_SECRET || env.ADMIN_PASSWORD_HASH || env.ADMIN_PASSWORD;
  if (!secret) return null;
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(): Promise<string> {
  const key = await getSigningKey();
  if (!key) throw new Error("Missing ADMIN_SESSION_SECRET / ADMIN_PASSWORD");
  const now = Math.floor(Date.now() / 1000);
  const payload = JSON.stringify({ role: "admin", iat: now, exp: now + SESSION_TTL_SECONDS });
  const payloadB64 = toBase64Url(encoder.encode(payload));
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  return `${payloadB64}.${toBase64Url(new Uint8Array(sig))}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sigB64] = parts;
  const key = await getSigningKey();
  if (!key) return false;
  try {
    const sig = fromBase64Url(sigB64);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sig.buffer as ArrayBuffer,
      encoder.encode(payloadB64)
    );
    if (!valid) return false;
    const payload = JSON.parse(decoder.decode(fromBase64Url(payloadB64))) as { exp?: number; role?: string };
    const now = Math.floor(Date.now() / 1000);
    return payload.role === "admin" && typeof payload.exp === "number" && payload.exp > now;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function requireAdmin(): Promise<NextResponse | null> {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function sessionCookieOptions(maxAge = SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}
