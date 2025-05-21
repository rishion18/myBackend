import jwt from "jsonwebtoken";
import { UTILS } from "../utils";

const JWT_ALGORITHM = "HS256";
const TOKEN_EXPIRY = "1d";

export const generateToken = (payload: Record<string, any>) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  const encrypted = UTILS.ENCRYPT(payload);
  return jwt.sign({ data: encrypted }, secret, {
    algorithm: JWT_ALGORITHM,
    expiresIn: TOKEN_EXPIRY,
  });
};

export const verifyToken = (token: string): Record<string, any> => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  try {
    const decoded = jwt.verify(token, secret) as { data?: string };

    if (!decoded.data) {
      throw new Error("Invalid token format: no data field found");
    }

    const decrypted = UTILS.DECRYPT(decoded.data); // should return an object
    return typeof decrypted === "string" ? JSON.parse(decrypted) : decrypted;
  } catch (error) {
    throw new Error("Token verification failed: " + (error as Error).message);
  }
};
