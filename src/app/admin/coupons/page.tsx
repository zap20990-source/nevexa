"use client";

import Link from "next/link";
import { ArrowLeft, Plus, Tag, Percent } from "lucide-react";

const coupons = [
  { id: "c1", code: "NEVEXA10", type: "percentage", value: 10, used: 45, maxUses: 100, status: "active" },
  { id: "c2", code: "BIENVENIDO", type: "fixed", value: 20000, used: 120, maxUses: null, status: "active" },
  { id: "c3", code: "VERANO2024", type: "percentage", value: 15, used: 200, maxUses: 200, status: "expired" },
];

export default function AdminCouponsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin" className="btn-ghost gap-2 mb-6 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-dark dark:text-white">Cupones</h1>
          <button className="btn-primary text-sm gap-2">
            <Plus className="w-4 h-4" /> Nuevo cupón
          </button>
        </div>
        <div className="space-y-3">
          {coupons.map((c) => (
            <div key={c.id} className="card p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  {c.type === "percentage" ? <Percent className="w-5 h-5 text-primary" /> : <Tag className="w-5 h-5 text-primary" />}
                </div>
                <div>
                  <p className="font-semibold text-dark dark:text-white">{c.code}</p>
                  <p className="text-xs text-gray-400">
                    {c.type === "percentage" ? `${c.value}% de descuento` : `$${c.value.toLocaleString()} de descuento`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{c.used} usado{c.maxUses ? ` / ${c.maxUses}` : ""}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  c.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {c.status === "active" ? "Activo" : "Expirado"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
