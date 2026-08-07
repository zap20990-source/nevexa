import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  comparePrice: z.number().positive().optional().nullable(),
  stock: z.number().int().min(0),
  sku: z.string().min(3),
  categoryId: z.string(),
  brandId: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(true),
  images: z.array(z.object({ url: z.string(), alt: z.string().optional() })).optional(),
  variants: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
        stock: z.number().int().min(0),
        price: z.number().positive().optional().nullable(),
      })
    )
    .optional(),
});

export const checkoutSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(4),
  notes: z.string().optional(),
  paymentMethod: z.enum(["stripe", "wompi", "mercadopago", "payu", "whatsapp"]),
  couponCode: z.string().optional(),
});

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3).optional(),
  comment: z.string().min(10).optional(),
});

export const addressSchema = z.object({
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().default("Colombia"),
  zipCode: z.string().min(4),
  isDefault: z.boolean().default(false),
});

export const couponSchema = z.object({
  code: z.string().min(3),
  type: z.enum(["percentage", "fixed"]),
  value: z.number().positive(),
  minAmount: z.number().positive().optional().nullable(),
  maxUses: z.number().int().positive().optional().nullable(),
  startsAt: z.string().optional().nullable(),
  endsAt: z.string().optional().nullable(),
  productId: z.string().optional().nullable(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
