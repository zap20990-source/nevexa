"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Sparkles } from "lucide-react";
import Image from "next/image";

const messages = [
  "¡Hola! Soy NEX 🤖",
  "Encontré una oferta para ti 🎉",
  "¿Necesitas ayuda?",
  "Creo que este producto te puede gustar 💙",
  "Gracias por comprar en NEVEXA 🚀",
  "¡Revisa nuestras nuevas ofertas!",
  "¿Ya viste lo nuevo? 👀",
];

interface NexProps {
  position?: "bottom-right" | "bottom-left";
  size?: "sm" | "md" | "lg";
}

export function Nex({ position = "bottom-right", size = "md" }: NexProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(messages[0]);
  const [showBubble, setShowBubble] = useState(false);

  const sizeMap = { sm: "w-12 h-12", md: "w-14 h-14", lg: "w-16 h-16" };

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 4000);
    }, 15000);

    const initialTimer = setTimeout(() => {
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 4000);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, []);

  const quickActions = [
    { label: "Ver productos", href: "/products", icon: "🛍️" },
    { label: "Ofertas", href: "/products?discount=true", icon: "🏷️" },
    { label: "Hablar con un asesor", href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573000000000"}?text=${encodeURIComponent("¡Hola! Quiero hablar con un asesor 🚀")}`, icon: "💬" },
    { label: "Consultar pedido", href: "/account/orders", icon: "📦" },
  ];

  const posClass =
    position === "bottom-right" ? "right-4 md:right-8" : "left-4 md:left-8";

  return (
    <div className={`fixed bottom-4 md:bottom-8 ${posClass} z-50`}>
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full mb-4 right-0 bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 max-w-[240px]"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image src="/images/nex.png" alt="NEX" width={24} height={24} className="w-6 h-6 object-contain" />
              </div>
              <p className="text-sm text-dark dark:text-white">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="absolute bottom-full mb-4 right-0 w-80 bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-5 bg-gradient-to-br from-primary to-primary-light text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                      <Image src="/images/nex.png" alt="NEX" width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">NEX</h3>
                      <p className="text-xs text-white/70">Asistente NEVEXA</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-white/90">
                  ¡Hola! Soy NEX 🤖 ¿En qué puedo ayudarte?
                </p>
              </div>

              <div className="p-4 space-y-2">
                {quickActions.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span className="text-sm font-medium text-dark dark:text-white group-hover:text-primary transition-colors">
                      {action.label}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-primary ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${sizeMap[size]} rounded-full bg-gradient-to-br from-primary to-primary-light shadow-lg shadow-primary/30 flex items-center justify-center text-white text-xl transition-shadow hover:shadow-xl hover:shadow-primary/40`}
        aria-label="Abrir chat con NEX"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Image src="/images/nex.png" alt="NEX" width={36} height={36} className="w-8 h-8 object-contain" />
        )}
      </motion.button>
    </div>
  );
}

export function NexBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-purple-600 p-8 text-white">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <Image src="/images/nex.png" alt="NEX" width={60} height={60} className="w-14 h-14 object-contain" />
        </div>
        <div>
          <h3 className="text-2xl font-bold font-heading mb-2">
            ¡NEX te ayuda a encontrar lo mejor!
          </h3>
          <p className="text-white/80 mb-4">
            Pregúntame lo que necesites. Estoy aquí para ayudarte a encontrar
            el producto perfecto.
          </p>
          <a href="/products" className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-5 py-2.5 rounded-lg hover:bg-white/90 transition-colors">
            Explorar productos <Sparkles className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute right-10 top-0 w-20 h-20 bg-pink-400/20 rounded-full blur-xl" />
    </div>
  );
}

export function NexMini({ message }: { message?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <Image src="/images/nex.png" alt="NEX" width={18} height={18} className="w-4 h-4 object-contain" />
      <span>{message || "¡Hola! Soy NEX"}</span>
    </div>
  );
}
