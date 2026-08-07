"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Sparkles } from "lucide-react";
import Image from "next/image";

const messages = [
  "¡Hola! Soy NEX, listo para ayudarte.",
  "Encontré una oferta especial para ti.",
  "¿Necesitas ayuda con tu compra?",
  "Creo que este producto te puede gustar.",
  "Gracias por comprar en NEVEXA.",
  "¡Revisa nuestras nuevas ofertas!",
  "¿Ya viste lo que llegó hoy?",
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
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, []);

  const quickActions = [
    { label: "Ver productos", href: "/products", icon: "🛍️" },
    { label: "Ofertas especiales", href: "/products?discount=true", icon: "🏷️" },
    { label: "Hablar con un asesor", href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573000000000"}?text=${encodeURIComponent("¡Hola! Quiero hablar con un asesor.")}`, icon: "💬" },
    { label: "Consultar mi pedido", href: "/account/orders", icon: "📦" },
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
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-full mb-5 right-0 bg-white dark:bg-dark-card rounded-2xl shadow-xl shadow-black/10 border border-gray-100 dark:border-gray-700 p-4 max-w-[260px]"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md">
                <Image
                  src="/images/nex.png"
                  alt="NEX"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-primary mb-0.5">NEX</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {message}
                </p>
              </div>
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
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-full mb-5 right-0 w-80 sm:w-88 bg-white dark:bg-dark-card rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="relative p-5 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 text-white">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-50" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/30 shadow-lg flex-shrink-0">
                      <Image
                        src="/images/nex.png"
                        alt="NEX"
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                      />
                    </div>
                      <div>
                        <h3 className="font-semibold text-sm">NEX</h3>
                        <p className="text-xs text-white/70">
                          Asistente virtual
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">
                    ¡Hola! Soy NEX. ¿En qué puedo ayudarte hoy?
                  </p>
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                {quickActions.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    target={
                      action.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      action.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                      {action.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">
                      {action.label}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-primary ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                ))}
              </div>

              <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
                <p className="text-xs text-gray-400 text-center">
                  Desarrollado con inteligencia artificial
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${sizeMap[size]} rounded-full shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 overflow-hidden`}
        aria-label="Abrir chat con NEX"
      >
        {isOpen ? (
          <div className="w-full h-full bg-primary rounded-full flex items-center justify-center">
            <X className="w-5 h-5 text-white" />
          </div>
        ) : (
          <Image
            src="/images/nex.png"
            alt="NEX"
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        )}
      </motion.button>
    </div>
  );
}

export function NexBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-blue-600 to-indigo-800 p-6 md:p-8 text-white group">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjA4Ii8+PC9zdmc+')] opacity-50" />
      <div className="relative flex flex-col sm:flex-row items-center gap-5">
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg shadow-primary/30 flex-shrink-0 group-hover:scale-105 transition-transform duration-500 border-2 border-white/30">
          <Image
            src="/images/nex.png"
            alt="NEX"
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl md:text-2xl font-bold font-heading mb-2">
            ¡NEX te ayuda a encontrar lo que buscas!
          </h3>
          <p className="text-white/80 text-sm mb-4 max-w-md">
            Pregúntame lo que necesites. Soy tu asistente personal para
            encontrar el producto perfecto al mejor precio.
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-5 py-2.5 rounded-xl hover:bg-white/95 hover:shadow-lg transition-all text-sm"
          >
            Explorar productos <Sparkles className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute right-16 -top-4 w-20 h-20 bg-violet-400/10 rounded-full blur-2xl" />
    </div>
  );
}

export function NexMini({ message }: { message?: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <div className="w-6 h-6 rounded-full overflow-hidden shadow-sm">
        <Image
          src="/images/nex.png"
          alt="NEX"
          width={24}
          height={24}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xs font-medium">
        {message || "¡Hola! Soy NEX"}
      </span>
    </div>
  );
}
