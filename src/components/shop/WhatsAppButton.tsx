"use client";

import { MessageCircle } from "lucide-react";
import { useCartStore } from "@/store";
import { generateWhatsAppMessage } from "@/lib/utils";

interface WhatsAppButtonProps {
  product?: {
    name: string;
    price: number;
  };
  variant?: "floating" | "inline";
  label?: string;
}

export function WhatsAppButton({
  product,
  variant = "floating",
  label = "Comprar por WhatsApp",
}: WhatsAppButtonProps) {
  const items = useCartStore((s) => s.items);

  const getMessage = () => {
    if (product) {
      return encodeURIComponent(
        `¡Hola NEVEXA! 👋\n\n` +
          `Me interesa el producto:\n` +
          `• ${product.name} - $${product.price.toLocaleString()}\n\n` +
          `¿Me pueden dar más información?\n\n` +
          `¡Gracias!`
      );
    }
    return generateWhatsAppMessage(
      items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        total: i.price * i.quantity,
      })),
      "Cliente",
      ""
    );
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573000000000";
  const url = `https://wa.me/${whatsappNumber}?text=${getMessage()}`;

  if (variant === "inline") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary bg-green-500 hover:bg-green-600 gap-2"
      >
        <MessageCircle className="w-5 h-5" />
        {label}
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 md:right-8 z-40 w-14 h-14 rounded-full bg-green-500 shadow-lg shadow-green-500/30 flex items-center justify-center text-white hover:bg-green-600 hover:scale-110 transition-all duration-300 group"
      aria-label="Comprar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 bg-white dark:bg-dark-card text-dark dark:text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        ¿Te ayudamos?
      </span>
    </a>
  );
}
