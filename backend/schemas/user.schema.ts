import { z } from "zod";
import { Role } from "@prisma/client";

export const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username can't be more than 30 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum([Role.admin, Role.user]),
  badges: z.array(z.string()).optional(),
  avatar: z.string().url().optional(), 
});


export const UpdateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username can't be more than 30 characters")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  role: z.enum([Role.admin, Role.user]).optional(),
  points: z.number().min(0, "Points must be a non-negative number").optional(),
  badges: z.array(z.string()).optional(),
  avatar: z.string().url().optional(),  
});

export const LoginUserSchema = z.object({
  identifier: z.string().min(1, "username or email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
