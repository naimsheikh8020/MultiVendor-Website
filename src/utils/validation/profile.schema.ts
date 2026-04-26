import { z } from "zod";

export const profileSchema = z.object({
  full_name: z.string().min(1, "Name is required"),
  phone_number: z.string().min(11, "Invalid phone number"),
  gender: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;