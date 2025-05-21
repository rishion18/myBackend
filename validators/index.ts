import { login, signUp } from "./userValidator";

export const VALIDATORS = {
    USER: signUp,
    LOGIN: login
}