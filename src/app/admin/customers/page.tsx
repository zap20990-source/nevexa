"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const customers = [
  { id: "u1", name: "Carlos Martínez", email: "carlos@email.com", orders: 5, spent: 1245000, joined: "2024-11-15" },
  { id: "u2", name: "Ana García", email: "ana@email.com", orders: 12, spent: 3450000, joined: "2024-10-02" },
  { id: "u3", name: "Pedro López", email: "pedro@email.com", orders: 3, spent: 469900, joined: "2024-12-01" },
  { id: "u4", name: "Laura Ríos", email: "laura@email.com", orders: 8, spent: 2150000, joined: "2024-09-20" },
  { id: "u5", name: "Juan Díaz", email: "juan@email.com", orders: 1, spent: 1249900, joined: "2024-12-10" },
];

export default function AdminCustomersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin" className="btn-ghost gap-2 mb-6 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-dark dark:text-white mb-6">Clientes</h1>
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-medium text-gray-500 uppercase border-b border-gray-100 dark:border-gray-800">
                <th className="text-left px-5 py-3">Cliente</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Pedidos</th>
                <th className="text-left px-5 py-3">Total gastado</th>
                <th className="text-left px-5 py-3">Registro</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-5 py-3 text-sm font-medium text-dark dark:text-white">{c.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-500">{c.email}</td>
                  <td className="px-5 py-3 text-sm">{c.orders}</td>
                  <td className="px-5 py-3 text-sm font-medium">${c.spent.toLocaleString()}</td>
                  <td className="px-5 py-3 text-sm text-gray-400">{c.joined}</td>
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
