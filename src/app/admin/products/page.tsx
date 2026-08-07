"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminProductsPage() {
  const products = [
    { id: "1", name: "Audífonos Pro", price: 299900, stock: 50, sales: 1234, status: "active" },
    { id: "2", name: "Teclado Mecánico RGB", price: 189900, stock: 30, sales: 856, status: "active" },
    { id: "3", name: "Mouse Gaming", price: 149900, stock: 100, sales: 2341, status: "active" },
    { id: "4", name: "Monitor 27\" 4K", price: 1249900, stock: 15, sales: 432, status: "active" },
    { id: "5", name: "Silla Ergonómica", price: 899900, stock: 0, sales: 678, status: "inactive" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin" className="btn-ghost gap-2 mb-6 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-dark dark:text-white">Productos</h1>
          <Link href="/admin/products/new" className="btn-primary text-sm">
            + Nuevo producto
          </Link>
        </div>
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-medium text-gray-500 uppercase border-b border-gray-100 dark:border-gray-800">
                <th className="text-left px-5 py-3">Producto</th>
                <th className="text-left px-5 py-3">Precio</th>
                <th className="text-left px-5 py-3">Stock</th>
                <th className="text-left px-5 py-3">Ventas</th>
                <th className="text-left px-5 py-3">Estado</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-5 py-3 text-sm font-medium text-dark dark:text-white">{p.name}</td>
                  <td className="px-5 py-3 text-sm">${p.price.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`text-sm font-medium ${p.stock === 0 ? "text-red-500" : "text-dark dark:text-white"}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">{p.sales}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      p.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {p.status === "active" ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-sm text-primary hover:underline">Editar</button>
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
