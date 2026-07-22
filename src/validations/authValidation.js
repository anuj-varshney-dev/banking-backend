import { z } from "zod";

export const registerSchema = z.object({
        name: z.string().trim().min(1, "Name is required"), //as name can be empty string so we need 1 minimum character to avoid empty string 
        email : z.string().trim().email("Please enter a valid email"),
        password: z.string().min(8,"Password must be at least 8 characters long")
        
});export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please enter a valid email"),

    password: z                         //login does not req name 
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters long")
});

