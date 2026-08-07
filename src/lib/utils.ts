import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function getDiscountPercent(
  price: number,
  comparePrice: number | null
): number | null {
  if (!comparePrice || comparePrice <= price) return null;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

export function generateWhatsAppMessage(
  products: { name: string; quantity: number; price: number; total: number }[],
  customerName: string,
  city: string
): string {
  const lines = products.map(
    (p) =>
      `• ${p.name} x${p.quantity} - ${formatPrice(p.total)}`
  );
  const grandTotal = products.reduce((sum, p) => sum + p.total, 0);
  return encodeURIComponent(
    `¡Hola NEVEXA! 👋\n\n` +
      `Mi nombre es: ${customerName}\n` +
      `Ciudad: ${city}\n\n` +
      `Productos:\n${lines.join("\n")}\n\n` +
      `Total: ${formatPrice(grandTotal)}\n\n` +
      `¡Gracias!`
  );
}

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/products" },
  { label: "Categorías", href: "/categories" },
  { label: "Ofertas", href: "/products?discount=true" },
  { label: "Nuevos", href: "/products?new=true" },
];

export const FOOTER_LINKS = {
  empresa: [
    { label: "Sobre NEVEXA", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Trabaja con nosotros", href: "#" },
  ],
  ayuda: [
    { label: "Centro de ayuda", href: "#" },
    { label: "Preguntas frecuentes", href: "#" },
    { label: "Contacto", href: "#" },
  ],
  legal: [
    { label: "Términos y condiciones", href: "#" },
    { label: "Política de privacidad", href: "#" },
    { label: "Política de devoluciones", href: "#" },
  ],
};

export const PAYMENT_METHODS = ["stripe", "wompi", "mercadopago", "payu"] as const;

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
] as const;
