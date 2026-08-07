"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  Shield,
  X,
} from "lucide-react";
import { useCartStore, type CartProduct } from "@/store";
import { WhatsAppButton } from "@/components/shop/WhatsAppButton";

export default function CartPage() {
  const { items, removeItem, updateQuantity, applyCoupon, removeCoupon, coupon, getSubtotal, getTotal, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState("");

  const subtotal = getSubtotal();
  const shipping = subtotal > 200000 ? 0 : 15000;
  const total = getTotal() + shipping;
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  const handleCoupon = () => {
    if (couponCode === "NEVEXA10") {
      applyCoupon({ code: "NEVEXA10", discount: subtotal * 0.1 });
    } else if (couponCode === "BIENVENIDO") {
      applyCoupon({ code: "BIENVENIDO", discount: 20000 });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-heading text-dark dark:text-white mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Agrega productos para empezar a comprar
          </p>
          <Link href="/products" className="btn-primary">
            Explorar productos <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="container-page py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-dark dark:text-white">
              Tu carrito
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {itemCount} producto{itemCount !== 1 ? "s" : ""}
            </p>
          </div>
          <Link href="/products" className="btn-ghost text-sm hidden sm:flex">
            Seguir comprando
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-800/50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Producto</div>
                <div className="col-span-2 text-center">Precio</div>
                <div className="col-span-2 text-center">Cantidad</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={`${item.id}-${item.variantId || ""}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="grid grid-cols-2 sm:grid-cols-12 gap-4 px-6 py-4 items-center border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <div className="col-span-2 sm:col-span-6 flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-3xl flex-shrink-0">
                        {item.image}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-dark dark:text-white line-clamp-2">
                          {item.name}
                        </p>
                        {item.variantName && (
                          <p className="text-xs text-gray-400 mt-0.5">{item.variantName}</p>
                        )}
                        <button
                          onClick={() => removeItem(item.id, item.variantId)}
                          className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 mt-2 sm:hidden"
                        >
                          <Trash2 className="w-3 h-3" /> Eliminar
                        </button>
                      </div>
                    </div>

                    <div className="hidden sm:block col-span-2 text-center text-sm text-dark dark:text-white">
                      ${item.price.toLocaleString()}
                    </div>

                    <div className="hidden sm:flex col-span-2 justify-center">
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variantId)}
                          className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-sm font-medium min-w-[32px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variantId)}
                          className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="hidden sm:flex col-span-2 items-center justify-end gap-3">
                      <span className="text-sm font-semibold text-dark dark:text-white">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeItem(item.id, item.variantId)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="col-span-2 sm:hidden flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variantId)}
                          className="p-1.5"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variantId)}
                          className="p-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-dark dark:text-white">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex justify-between mt-4">
              <button onClick={clearCart} className="btn-ghost text-sm text-red-500">
                Vaciar carrito
              </button>
              <Link href="/products" className="btn-ghost text-sm sm:hidden">
                Seguir comprando
              </Link>
            </div>
          </div>

          <div>
            <div className="card p-6 sticky top-24 space-y-5">
              <h3 className="text-lg font-bold font-heading text-dark dark:text-white">
                Resumen del pedido
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Código de cupón"
                  className="input-field flex-1 text-sm py-2.5"
                />
                <button onClick={handleCoupon} className="btn-outline text-xs px-3">
                  <Tag className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-400 -mt-3">Prueba: NEVEXA10 o BIENVENIDO</p>

              {coupon && (
                <div className="flex items-center justify-between bg-success/10 rounded-lg px-3 py-2">
                  <span className="text-sm text-success font-medium flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> {coupon.code}
                  </span>
                  <button onClick={removeCoupon} className="text-success hover:text-red-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="space-y-2.5 text-sm">
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
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-lg font-bold text-dark dark:text-white">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <Truck className="w-4 h-4" />
                  Te faltan ${(200000 - subtotal).toLocaleString()} para envío gratis
                </div>
              )}

              <Link href="/checkout" className="btn-primary w-full text-base">
                Ir a pagar <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <WhatsAppButton variant="inline" label="Solicitar cotización" />

              <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                <Shield className="w-3.5 h-3.5" /> Compra segura SSL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
