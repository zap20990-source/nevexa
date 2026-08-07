"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Image as ImageIcon,
  BarChart3,
  ChevronRight,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Star,
  Plus,
} from "lucide-react";

const stats = [
  { label: "Ventas hoy", value: "$2.450.000", icon: DollarSign, change: "+12.5%", positive: true },
  { label: "Pedidos", value: "48", icon: ShoppingCart, change: "+8.2%", positive: true },
  { label: "Productos", value: "1,234", icon: Package, change: "+23", positive: true },
  { label: "Clientes", value: "892", icon: Users, change: "+56", positive: true },
];

const recentOrders = [
  { id: "ORD-001", customer: "Carlos Martínez", total: 299900, status: "delivered", date: "Hace 2 horas" },
  { id: "ORD-002", customer: "Ana García", total: 339800, status: "shipped", date: "Hace 4 horas" },
  { id: "ORD-003", customer: "Pedro López", total: 89900, status: "confirmed", date: "Hace 6 horas" },
  { id: "ORD-004", customer: "Laura Ríos", total: 159900, status: "pending", date: "Hace 8 horas" },
];

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
  { icon: Package, label: "Productos", href: "/admin/products" },
  { icon: Tag, label: "Categorías", href: "/admin/categories" },
  { icon: ShoppingBag, label: "Pedidos", href: "/admin/orders" },
  { icon: Users, label: "Clientes", href: "/admin/customers" },
  { icon: ImageIcon, label: "Banners", href: "/admin/banners" },
  { icon: BarChart3, label: "Estadísticas", href: "/admin/coupons" },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><div className="skeleton w-8 h-8 rounded-full" /></div>;

  if (status === "unauthenticated" || (session?.user as any)?.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} hidden lg:flex flex-col bg-white dark:bg-dark-card border-r border-gray-200 dark:border-gray-800 transition-all duration-300`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="h-7 w-auto flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="NEVEXA"
                width={28}
                height={28}
                className="h-full w-auto"
              />
            </div>
            {sidebarOpen && <span className="font-bold font-heading text-dark dark:text-white text-sm">NEVEXA</span>}
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                link.active
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link href="/" className="text-sm text-gray-500 hover:text-primary flex items-center gap-2">
            <ChevronRight className="w-4 h-4" /> {sidebarOpen && "Ver tienda"}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn-ghost p-1.5">
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold font-heading text-dark dark:text-white">Dashboard</h1>
          </div>
          <Link href="/admin/products/new" className="btn-primary text-sm gap-2">
            <Plus className="w-4 h-4" /> Nuevo producto
          </Link>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.positive ? "text-success" : "text-danger"}`}>
                    <TrendingUp className="w-3 h-3" /> {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-dark dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 card">
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-bold text-dark dark:text-white">Pedidos recientes</h2>
                <Link href="/admin/orders" className="text-sm text-primary hover:underline">Ver todos</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-medium text-gray-500 uppercase border-b border-gray-100 dark:border-gray-800">
                      <th className="text-left px-5 py-3">Pedido</th>
                      <th className="text-left px-5 py-3">Cliente</th>
                      <th className="text-left px-5 py-3">Total</th>
                      <th className="text-left px-5 py-3">Estado</th>
                      <th className="text-left px-5 py-3">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-5 py-3 text-sm font-medium text-dark dark:text-white">{order.id}</td>
                        <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-300">{order.customer}</td>
                        <td className="px-5 py-3 text-sm font-medium text-dark dark:text-white">${order.total.toLocaleString()}</td>
                        <td className="px-5 py-3">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-5 py-3 text-sm text-gray-400">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="card p-5">
                <h2 className="text-lg font-bold text-dark dark:text-white mb-4">Categorías populares</h2>
                <div className="space-y-3">
                  {[
                    { name: "Tecnología", value: 35 },
                    { name: "Gaming", value: 25 },
                    { name: "Accesorios", value: 20 },
                    { name: "Oficina", value: 15 },
                    { name: "Hogar", value: 5 },
                  ].map((cat) => (
                    <div key={cat.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-dark dark:text-white">{cat.name}</span>
                        <span className="text-gray-500">{cat.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${cat.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-5">
                <h2 className="text-lg font-bold text-dark dark:text-white mb-4">Acciones rápidas</h2>
                <div className="space-y-2">
                  <Link href="/admin/products/new" className="btn-primary w-full gap-2 text-sm">
                    <Plus className="w-4 h-4" /> Agregar producto
                  </Link>
                  <Link href="/admin/categories" className="btn-outline w-full gap-2 text-sm">
                    <Tag className="w-4 h-4" /> Gestionar categorías
                  </Link>
                  <Link href="/admin/coupons" className="btn-outline w-full gap-2 text-sm">
                    <Tag className="w-4 h-4" /> Crear cupón
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    pending: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    shipped: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  const labels: Record<string, string> = {
    pending: "Pendiente",
    confirmed: "Confirmado",
    shipped: "Enviado",
    delivered: "Entregado",
    cancelled: "Cancelado",
  };
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${config[status]}`}>
      {labels[status]}
    </span>
  );
}
