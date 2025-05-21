import {z} from "zod";

export const signUp = z.object({
    name: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6).max(30),
    phone: z.string().min(10).max(15).optional(),
    address: z.string().min(10).max(30).optional(),
    userName: z.string().min(3).max(30).optional(),
    role: z.string(),
})

export const login = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(30)
})