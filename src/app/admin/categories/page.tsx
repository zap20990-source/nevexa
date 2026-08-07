"use client";

import Link from "next/link";
import { ArrowLeft, Trash2, Edit } from "lucide-react";

const categories = [
  { id: "c1", name: "Tecnología", slug: "tecnologia", products: 156, isActive: true },
  { id: "c2", name: "Gaming", slug: "gaming", products: 89, isActive: true },
  { id: "c3", name: "Hogar", slug: "hogar", products: 234, isActive: true },
  { id: "c4", name: "Oficina", slug: "oficina", products: 112, isActive: true },
  { id: "c5", name: "Accesorios", slug: "accesorios", products: 198, isActive: false },
];

export default function AdminCategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin" className="btn-ghost gap-2 mb-6 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-dark dark:text-white">Categorías</h1>
          <button className="btn-primary text-sm">+ Nueva categoría</button>
        </div>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="card p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-dark dark:text-white">{cat.name}</p>
                <p className="text-xs text-gray-400">{cat.products} productos</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  cat.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {cat.isActive ? "Activo" : "Inactivo"}
                </span>
                <button className="btn-ghost p-1.5"><Edit className="w-4 h-4" /></button>
                <button className="btn-ghost p-1.5 text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
