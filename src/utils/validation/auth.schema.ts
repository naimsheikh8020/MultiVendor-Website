import { z } from "zod";

export const registerSchema = z
  .object({
    full_name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone_number: z.string().min(1, "Phone is required"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ✅ IMPORTANT — must export
export type RegisterFormData = z.infer<typeof registerSchema>;