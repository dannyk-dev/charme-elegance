import { string, z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  price: z.number().min(1),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum(["men", "women", "kids"]),
  isFeatured: z.boolean().optional(),
  brandId: z.string(),
  gender: z.enum(["men", "women"]),
  size: z.string().optional(),
});

export const bannerSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  imageString: z.string(),
  url: z.string().optional(),
});

export const brandSchema = z.object({
  name: z.string(),
  logo: z
    .array(z.string())
    .min(1, "At least 1 image is required")
    .max(1, "Only 1 image is needed"),
});

export const brandSettingsSchema = z.object({
  // name
  logo_header: z
    .array(z.string())
    .min(1, "At least 1 image is required")
    .max(1, "Only 1 image is needed"),
  logo_footer: z
    .array(z.string())
    .min(1, "At least 1 image is required")
    .max(1, "Only 1 image is needed"),
  primary_color: z.string().optional(),
  foreground_color: z.string().optional(),
  accent_color: z.string().optional(),
});
