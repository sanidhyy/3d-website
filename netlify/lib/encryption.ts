import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;
const ITERATIONS = 100000;

const getEncryptionPassword = (): string => {
  const secret = process.env.VERIFICATION_SECRET?.trim() ?? "";

  if (!secret) {
    throw new Error("VERIFICATION_SECRET is not configured.");
  }

  return secret;
};

const getKey = (salt: Buffer): Buffer =>
  crypto.pbkdf2Sync(getEncryptionPassword(), salt, ITERATIONS, KEY_LENGTH, "sha256");

export const encrypt = (text: string): string => {
  if (!text) {
    return "";
  }

  try {
    const salt = crypto.randomBytes(SALT_LENGTH);
    const iv = crypto.randomBytes(IV_LENGTH);
    const key = getKey(salt);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(text, "utf8"),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();
    const result = Buffer.concat([salt, iv, tag, encrypted]);

    return result.toString("base64");
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "VERIFICATION_SECRET is not configured."
    ) {
      throw error;
    }

    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
};

export const decrypt = (encryptedText: string): string => {
  if (!encryptedText) {
    return "";
  }

  try {
    const buffer = Buffer.from(encryptedText, "base64");
    const minLength = SALT_LENGTH + IV_LENGTH + TAG_LENGTH;

    if (buffer.length < minLength) {
      throw new Error("Invalid encrypted data length");
    }

    const salt = buffer.subarray(0, SALT_LENGTH);
    const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const tag = buffer.subarray(
      SALT_LENGTH + IV_LENGTH,
      SALT_LENGTH + IV_LENGTH + TAG_LENGTH,
    );
    const encrypted = buffer.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    const key = getKey(salt);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "VERIFICATION_SECRET is not configured."
    ) {
      throw error;
    }

    console.error("Decryption error:", error);
    return "";
  }
};
