"use client";

import Link from "next/link";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  MapPin,
  ArrowRight,
} from "lucide-react";

const orders = [
  { id: "ORD-001", date: "2024-12-20", status: "delivered", total: 299900, items: [{ name: "Audífonos Pro", quantity: 1, price: 299900, image: "🎧" }] },
  { id: "ORD-002", date: "2024-12-18", status: "shipped", total: 339800, items: [{ name: "Teclado Mecánico RGB", quantity: 1, price: 189900, image: "⌨️" }, { name: "Mouse Gaming", quantity: 1, price: 149900, image: "🖱️" }] },
  { id: "ORD-003", date: "2024-12-10", status: "confirmed", total: 89900, items: [{ name: "Hub USB-C", quantity: 1, price: 89900, image: "🔌" }] },
];

const statusConfig: Record<string, { icon: any; color: string; label: string }> = {
  pending: { icon: Clock, color: "text-orange-500", label: "Pendiente" },
  confirmed: { icon: CheckCircle, color: "text-blue-500", label: "Confirmado" },
  shipped: { icon: Truck, color: "text-purple-500", label: "Enviado" },
  delivered: { icon: Package, color: "text-green-500", label: "Entregado" },
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="container-page py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-dark dark:text-white">
              Mis pedidos
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Historial de tus compras
            </p>
          </div>
        </div>

        {/* Account nav */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { href: "/account/orders", label: "Pedidos", active: true },
            { href: "/account/profile", label: "Perfil", active: false },
            { href: "/account/favorites", label: "Favoritos", active: false },
            { href: "/account/addresses", label: "Direcciones", active: false },
          ].map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                tab.active
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="card p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Sin pedidos</h3>
            <p className="text-gray-500 mb-4">Aún no has realizado ninguna compra</p>
            <Link href="/products" className="btn-primary">
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              return (
                <div key={order.id} className="card overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-semibold text-dark dark:text-white">{order.id}</p>
                        <p className="text-xs text-gray-400">{order.date}</p>
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {status.label}
                      </div>
                    </div>
                    <span className="text-lg font-bold text-dark dark:text-white">
                      ${order.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="px-6 py-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 py-2">
                        <span className="text-2xl">{item.image}</span>
                        <div className="flex-1">
                          <p className="text-sm text-dark dark:text-white">{item.name}</p>
                          <p className="text-xs text-gray-400">x{item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium text-dark dark:text-white">
                          ${item.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
