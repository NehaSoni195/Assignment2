import { z } from "zod";

export const mobileSchema = z.object({
  mobile: z
    .string()
    .min(10, "Enter valid mobile number")
    .max(10, "Enter valid mobile number")
    .regex(/^[6-9]\d{9}$/, "Enter valid mobile number"),
});

export const otpSchema = z.object({
  otp: z.string().length(4, "Enter valid OTP"),
});

export const detailsSchema = z.object({
  name: z.string().min(3, "Name required"),

  email: z.string().email("Invalid email"),

  age: z.string(),

  city: z.string(),

  gender: z.string(),
});
