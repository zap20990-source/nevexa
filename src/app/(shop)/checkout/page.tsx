"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  CreditCard,
  Wallet,
  Building2,
  Banknote,
  ArrowLeft,
  Shield,
  Check,
  MessageCircle,
} from "lucide-react";
import { useCartStore } from "@/store";
import { checkoutSchema, type CheckoutInput } from "@/lib/validations";
import toast from "react-hot-toast";

const paymentMethods = [
  { id: "stripe", name: "Tarjeta de crédito/débito", icon: CreditCard },
  { id: "wompi", name: "Wompi", icon: Wallet },
  { id: "mercadopago", name: "Mercado Pago", icon: Building2 },
  { id: "payu", name: "PayU", icon: Banknote },
  { id: "whatsapp", name: "Pagar por WhatsApp", icon: MessageCircle },
];

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { items, coupon, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState("stripe");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 200000 ? 0 : 15000;
  const total = getTotal() + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      paymentMethod: "stripe",
    },
  });

  const onSubmit = async (data: CheckoutInput) => {
    setIsSubmitting(true);
    if (data.paymentMethod === "whatsapp") {
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573000000000";
      const productList = items
        .map((i) => `• ${i.name} x${i.quantity} - $${(i.price * i.quantity).toLocaleString()}`)
        .join("\n");
      const msg = encodeURIComponent(
        `¡Hola NEVEXA! 👋\n\n` +
          `Nombre: ${data.name}\n` +
          `Email: ${data.email}\n` +
          `Teléfono: ${data.phone}\n` +
          `Ciudad: ${data.city}\n` +
          `Dirección: ${data.street}\n\n` +
          `Productos:\n${productList}\n\n` +
          `Total: $${total.toLocaleString()}\n\n` +
          `¡Gracias!`
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
    } else {
      try {
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subtotal,
            shipping,
            discount: coupon?.discount || 0,
            total,
            notes: data.notes || "",
            paymentMethod: data.paymentMethod,
            userId: data.email,
            items: items.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price * item.quantity,
            })),
          }),
        });
      } catch {}
    }
    clearCart();
    toast.success("¡Pedido realizado con éxito!");
    router.push("/account/orders");
  };

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="skeleton w-8 h-8 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="container-page py-8">
        <button onClick={() => router.back()} className="btn-ghost gap-2 mb-6">
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>

        <h1 className="text-2xl md:text-3xl font-bold font-heading text-dark dark:text-white mb-8">
          Finalizar compra
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <h2 className="text-lg font-bold font-heading text-dark dark:text-white mb-4">
                Datos personales
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Nombre completo *
                  </label>
                  <input {...register("name")} className="input-field" />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Email *
                  </label>
                  <input {...register("email")} type="email" className="input-field" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Teléfono *
                  </label>
                  <input {...register("phone")} className="input-field" />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <h2 className="text-lg font-bold font-heading text-dark dark:text-white mb-4">
                Dirección de envío
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Dirección *
                  </label>
                  <input {...register("street")} className="input-field" placeholder="Calle, número, apartamento" />
                  {errors.street && <p className="text-xs text-red-500 mt-1">{errors.street.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Ciudad *
                  </label>
                  <input {...register("city")} className="input-field" />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Departamento *
                  </label>
                  <input {...register("state")} className="input-field" />
                  {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                    Código postal *
                  </label>
                  <input {...register("zipCode")} className="input-field" />
                  {errors.zipCode && <p className="text-xs text-red-500 mt-1">{errors.zipCode.message}</p>}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <h2 className="text-lg font-bold font-heading text-dark dark:text-white mb-4">
                Método de pago
              </h2>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={() => {
                        setSelectedPayment(method.id);
                      }}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedPayment === method.id
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}>
                      {selectedPayment === method.id && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <method.icon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-dark dark:text-white">{method.name}</span>
                  </label>
                ))}
              </div>
              <input type="hidden" {...register("paymentMethod")} value={selectedPayment} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6"
            >
              <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                Notas del pedido (opcional)
              </label>
              <textarea
                {...register("notes")}
                rows={3}
                className="input-field resize-none"
                placeholder="Instrucciones especiales para la entrega..."
              />
            </motion.div>
          </div>

          <div>
            <div className="card p-6 sticky top-24 space-y-5">
              <h2 className="text-lg font-bold font-heading text-dark dark:text-white">
                Resumen del pedido
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.id}-${item.variantId || ""}`} className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl flex-shrink-0">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-dark dark:text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-dark dark:text-white">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Envío</span>
                  <span>{shipping === 0 ? "Gratis" : `$${shipping.toLocaleString()}`}</span>
                </div>
                {coupon && (
                  <div className="flex justify-between text-success">
                    <span>Descuento</span>
                    <span>-${coupon.discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              <div className="flex justify-between text-lg font-bold text-dark dark:text-white">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-base"
              >
                {isSubmitting ? (
                  "Procesando..."
                ) : selectedPayment === "whatsapp" ? (
                  <>
                    <MessageCircle className="w-5 h-5 mr-2" /> Ir a WhatsApp
                  </>
                ) : (
                  <>
                    Pagar ${total.toLocaleString()}
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Tus datos están protegidos con encriptación SSL
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
