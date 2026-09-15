import type { HandlerEvent } from "@netlify/functions";

import { isOpenAIApiKeyFormat } from "../../shared/dalle";
import { decrypt, encrypt } from "./encryption";

export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

type EventHeaders = HandlerEvent["headers"];

const getHeader = (headers: EventHeaders, name: string): string | undefined => {
  const target = name.toLowerCase();

  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === target) return value;
  }

  return undefined;
};

export const isHttps = (headers: EventHeaders): boolean => {
  const proto = getHeader(headers, "x-forwarded-proto") ?? "";
  return proto.split(",")[0]?.trim() === "https";
};

export const getCookieName = (): string => {
  const name = process.env.AI_SETTINGS_COOKIE_NAME?.trim() ?? "";

  if (!name) {
    throw new Error("AI_SETTINGS_COOKIE_NAME is not configured.");
  }

  return name;
};

const parseCookieValue = (
  cookieHeader: string | undefined,
  name: string,
): string => {
  if (!cookieHeader) return "";

  for (const part of cookieHeader.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;

    const key = part.slice(0, separator).trim();
    if (key !== name) continue;

    const raw = part.slice(separator + 1).trim();
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }

  return "";
};

const serializeCookie = (
  name: string,
  value: string,
  options: { maxAge: number; secure: boolean },
): string => {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    `Max-Age=${options.maxAge}`,
    "HttpOnly",
    "SameSite=Lax",
  ];

  if (options.secure) parts.push("Secure");

  return parts.join("; ");
};

export const getEncryptedAiSettingsCookie = (headers: EventHeaders): string =>
  parseCookieValue(getHeader(headers, "cookie"), getCookieName()).trim();

export const getOpenAIApiKeyFromEvent = (
  headers: EventHeaders,
): string | null => {
  const encrypted = getEncryptedAiSettingsCookie(headers);

  if (!encrypted) return null;

  const decrypted = decrypt(encrypted).trim();
  return isOpenAIApiKeyFormat(decrypted) ? decrypted : null;
};

export const buildAiSettingsCookie = (
  apiKey: string,
  headers: EventHeaders,
): string =>
  serializeCookie(getCookieName(), encrypt(apiKey), {
    maxAge: COOKIE_MAX_AGE,
    secure: isHttps(headers),
  });

export const buildClearedAiSettingsCookie = (headers: EventHeaders): string =>
  serializeCookie(getCookieName(), "", {
    maxAge: 0,
    secure: isHttps(headers),
  });

export const isAiSettingsConfigError = (error: unknown): boolean =>
  error instanceof Error &&
  (error.message === "AI_SETTINGS_COOKIE_NAME is not configured." ||
    error.message === "VERIFICATION_SECRET is not configured.");
