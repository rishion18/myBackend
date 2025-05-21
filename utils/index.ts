import { connectToDb } from "./connectToDb";
import { decryptPayload, encryptPayload, hashPassword, verifyPassword } from "./crypto";
import { sendSuccess } from "./response";

export const UTILS = {
    CONNECT_DB: connectToDb,
    SUCCESS_RESPONSE: sendSuccess,
    ENCRYPT: encryptPayload,
    DECRYPT: decryptPayload,
    HASH_PASSWORD: hashPassword,
    VERIFY_PASSWORD: verifyPassword
}