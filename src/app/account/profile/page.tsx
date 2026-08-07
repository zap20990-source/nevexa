"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone } from "lucide-react";
import toast from "react-hot-toast";

const STORAGE_KEY = "nevexa-profile";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, reset, formState: { isDirty } } = useForm({
    defaultValues: { name: "", email: "", phone: "" },
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        reset({ name: data.name || "", email: data.email || "", phone: data.phone || "" });
      }
    } catch {}
  }, [reset]);

  const onSubmit = (data: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSaved(true);
    toast.success("Perfil actualizado correctamente");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="container-page py-8">
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-dark dark:text-white mb-2">Mi perfil</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Gestiona tu información personal</p>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { href: "/account/orders", label: "Pedidos" },
            { href: "/account/profile", label: "Perfil", active: true },
            { href: "/account/favorites", label: "Favoritos" },
            { href: "/account/addresses", label: "Direcciones" },
          ].map((tab) => (
            <Link key={tab.href} href={tab.href} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab.active ? "bg-primary text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="card p-8 max-w-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">U</div>
            <div>
              <h2 className="text-xl font-bold text-dark dark:text-white">Usuario</h2>
              <p className="text-sm text-gray-500">Tu información personal</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">Nombre</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input {...register("name")} className="input-field pl-10" placeholder="Tu nombre completo" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input {...register("email")} className="input-field pl-10" placeholder="tu@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input {...register("phone")} className="input-field pl-10" placeholder="+57 300 000 0000" />
              </div>
            </div>
            <button type="submit" disabled={!isDirty && !saved} className={`btn-primary ${saved ? "bg-success hover:bg-success" : ""}`}>
              {saved ? "Guardado" : "Guardar cambios"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
