import * as z from "zod";
import { RESERVED_SLUGS } from "./reserved-slugs";

export const linkFormSchema = z.object({
  url: z
    .string()
    .min(1, "Please enter a URL.")
    .transform((val) => {
      if (/^https?:\/\//i.test(val)) {
        return val;
      }
      return `https://${val}`;
    })
    .refine((val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, "Please enter a valid URL."),

  slug: z
    .string()
    .min(1, "Please choose a slug.")
    .max(40, "Slug is too long.")
    .regex(
      /^[a-z0-9-]+$/,
      "Only lowercase letters, numbers, and hyphens are allowed.",
    )
    .refine(
      (val) => !RESERVED_SLUGS.has(val),
      "This slug is reserved. Please choose another one.",
    ),
});

export type LinkFormValues = z.infer<typeof linkFormSchema>;
