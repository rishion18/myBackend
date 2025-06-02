import { login, signUp } from "./userValidator.js";

export const VALIDATORS = {
    USER: signUp,
    LOGIN: login
}