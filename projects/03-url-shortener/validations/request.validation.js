import { email, z } from "zod";

export const signUpPostRequestBodySchema = z.object({
  firstname: z.string().trim().min(3).nonoptional(),
  lastname: z.string().trim().optional(),
  email: z.email().trim(),
  password: z.string().trim().min(6),
});

export const loginPostRequestBodySchema = z.object({
  email: z.email().trim(),
  password: z.string().trim().min(6),
});

export const shortenPostRequestBodySchema = z.object({
  url: z.url(),
  code: z.string().optional()
});

export const uuidDeleteRequestBodySchema = z.object({
  urlId: z.uuid()
});