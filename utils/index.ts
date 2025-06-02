import { connectToDb } from "./connectToDb.js";
import { decryptPayload, encryptPayload, hashPassword, verifyPassword } from "./crypto.js";
import { sendSuccess } from "./response.js";

export const UTILS = {
    CONNECT_DB: connectToDb,
    SUCCESS_RESPONSE: sendSuccess,
    ENCRYPT: encryptPayload,
    DECRYPT: decryptPayload,
    HASH_PASSWORD: hashPassword,
    VERIFY_PASSWORD: verifyPassword
}