"use client";

import Link from "next/link";
import { ArrowLeft, Plus, Image as ImageIcon, Eye, EyeOff } from "lucide-react";

const banners = [
  { id: "b1", title: "Ofertas de Verano", subtitle: "Hasta 50% off", image: "🏖️", isActive: true, order: 1 },
  { id: "b2", title: "Nuevos Gaming", subtitle: "Lo último en gaming", image: "🎮", isActive: true, order: 2 },
  { id: "b3", title: "Tecnología Pro", subtitle: "Equipos profesionales", image: "💻", isActive: false, order: 3 },
];

export default function AdminBannersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin" className="btn-ghost gap-2 mb-6 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-dark dark:text-white">Banners</h1>
          <button className="btn-primary text-sm gap-2">
            <Plus className="w-4 h-4" /> Nuevo banner
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {banners.map((b) => (
            <div key={b.id} className="card p-5">
              <div className="w-full h-32 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-4xl mb-4">
                {b.image}
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-dark dark:text-white">{b.title}</h3>
                  <p className="text-sm text-gray-400">{b.subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className={`btn-ghost p-1.5 ${!b.isActive ? "text-red-500" : ""}`}>
                    {b.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button className="btn-ghost p-1.5 text-red-500">
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
