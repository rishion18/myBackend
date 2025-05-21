import crypto from "crypto";
import bcrypt from "bcryptjs";


const ALGORITHM = "aes-256-cbc";

const KEY = crypto.scryptSync(process.env.JWT_ENCRYPTION_SECRET!, "salt", 32); 
const IV = crypto.randomBytes(16);

export const encryptPayload = (payload: Record<string, any>) => {
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
  let encrypted = cipher.update(JSON.stringify(payload), "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${IV.toString("hex")}:${encrypted}`;
}

export const decryptPayload = (encrypted: string): object => {
  const [ivHex, content] = encrypted.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  let decrypted = decipher.update(content, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = process.env.SALT_ROUNDS;
  const PEPPER = process.env.PEPPER_SECRET || "";
  if (!saltRounds) throw new Error("SALT_ROUNDS is not set");
    

  const hashedPassword = await bcrypt.hash(password + PEPPER, 12);
  return hashedPassword;
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const PEPPER = process.env.PEPPER_SECRET || "";
  return await bcrypt.compare(password + PEPPER, hash);
};