"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Camera } from "lucide-react";
import toast from "react-hot-toast";

const STORAGE_KEY = "nevexa-profile";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [saved, setSaved] = useState(false);

  if (status === "unauthenticated") redirect("/login");
  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="skeleton w-8 h-8 rounded-full" />
      </div>
    );

  const { register, handleSubmit, reset, formState: { isDirty } } = useForm({
    defaultValues: { name: "", email: "", phone: "" },
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        reset({
          name: data.name || session?.user?.name || "",
          email: session?.user?.email || data.email || "",
          phone: data.phone || "",
        });
      } else {
        reset({
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          phone: "",
        });
      }
    } catch {
      reset({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
      });
    }
  }, [session, reset]);

  const onSubmit = (data: any) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ name: data.name, phone: data.phone, email: data.email })
    );
    setSaved(true);
    toast.success("Perfil actualizado correctamente");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="container-page py-8">
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-dark dark:text-white mb-2">
          Mi perfil
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          Gestiona tu información personal
        </p>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { href: "/account/orders", label: "Pedidos" },
            { href: "/account/profile", label: "Perfil", active: true },
            { href: "/account/favorites", label: "Favoritos" },
            { href: "/account/addresses", label: "Direcciones" },
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

        <div className="card p-8 max-w-2xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                  {(session?.user?.name || "U")[0].toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-dark dark:text-white">
                {session?.user?.name || "Usuario"}
              </h2>
              <p className="text-sm text-gray-500">{session?.user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                Nombre
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input {...register("name")} className="input-field pl-10" placeholder="Tu nombre completo" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input {...register("email")} className="input-field pl-10 bg-gray-50 dark:bg-gray-800" disabled />
              </div>
              <p className="text-xs text-gray-400 mt-1">El email no se puede cambiar</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("phone")}
                  className="input-field pl-10"
                  placeholder="+57 300 000 0000"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!isDirty && !saved}
              className={`btn-primary ${
                saved ? "bg-success hover:bg-success" : ""
              }`}
            >
              {saved ? "Guardado" : "Guardar cambios"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
