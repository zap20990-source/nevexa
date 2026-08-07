"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MapPin, Plus, Check, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const addresses = [
  { id: "a1", street: "Calle 123 #45-67", city: "Bogotá", state: "Cundinamarca", country: "Colombia", zipCode: "110111", isDefault: true },
  { id: "a2", street: "Carrera 89 #12-34 Apto 501", city: "Medellín", state: "Antioquia", country: "Colombia", zipCode: "050001", isDefault: false },
];

export default function AddressesPage() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") redirect("/login");
  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><div className="skeleton w-8 h-8 rounded-full" /></div>;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="container-page py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-dark dark:text-white">
              Mis direcciones
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Gestiona tus direcciones de envío
            </p>
          </div>
          <button
            onClick={() => toast.success("Funcionalidad en desarrollo")}
            className="btn-primary gap-2"
          >
            <Plus className="w-4 h-4" /> Nueva dirección
          </button>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { href: "/account/orders", label: "Pedidos" },
            { href: "/account/profile", label: "Perfil" },
            { href: "/account/favorites", label: "Favoritos" },
            { href: "/account/addresses", label: "Direcciones", active: true },
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

        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="card p-6 relative">
              {addr.isDefault && (
                <span className="absolute top-3 right-3 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  Principal
                </span>
              )}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-dark dark:text-white">{addr.street}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {addr.city}, {addr.state}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{addr.country}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">CP: {addr.zipCode}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                {!addr.isDefault && (
                  <button className="text-sm text-primary hover:underline flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Establecer como principal
                  </button>
                )}
                <button className="text-sm text-red-500 hover:underline flex items-center gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
