"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const orders = [
  { id: "ORD-001", customer: "Carlos Martínez", email: "carlos@email.com", total: 299900, status: "delivered", date: "2024-12-20", items: 1 },
  { id: "ORD-002", customer: "Ana García", email: "ana@email.com", total: 339800, status: "shipped", date: "2024-12-18", items: 2 },
  { id: "ORD-003", customer: "Pedro López", email: "pedro@email.com", total: 89900, status: "confirmed", date: "2024-12-15", items: 1 },
  { id: "ORD-004", customer: "Laura Ríos", email: "laura@email.com", total: 159900, status: "pending", date: "2024-12-14", items: 1 },
  { id: "ORD-005", customer: "Juan Díaz", email: "juan@email.com", total: 1249900, status: "cancelled", date: "2024-12-10", items: 1 },
];

const statusColors: Record<string, string> = {
  pending: "bg-orange-100 text-orange-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export default function AdminOrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin" className="btn-ghost gap-2 mb-6 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-dark dark:text-white mb-6">Pedidos</h1>
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-medium text-gray-500 uppercase border-b border-gray-100 dark:border-gray-800">
                <th className="text-left px-5 py-3">Pedido</th>
                <th className="text-left px-5 py-3">Cliente</th>
                <th className="text-left px-5 py-3">Total</th>
                <th className="text-left px-5 py-3">Estado</th>
                <th className="text-left px-5 py-3">Fecha</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-5 py-3 text-sm font-medium text-dark dark:text-white">{o.id}</td>
                  <td className="px-5 py-3">
                    <p className="text-sm text-dark dark:text-white">{o.customer}</p>
                    <p className="text-xs text-gray-400">{o.email}</p>
                  </td>
                  <td className="px-5 py-3 text-sm font-medium">${o.total.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <select className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[o.status]} border-0 cursor-pointer`}>
                      {Object.entries(statusLabels).map(([val, label]) => (
                        <option key={val} value={val} selected={val === o.status}>{label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-400">{o.date}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-sm text-primary hover:underline">Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
