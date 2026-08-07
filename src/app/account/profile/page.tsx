"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Camera } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") redirect("/login");
  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><div className="skeleton w-8 h-8 rounded-full" /></div>;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: "",
    },
  });

  const onSubmit = (data: any) => {
    toast.success("Perfil actualizado correctamente");
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
                <img src={session.user.image} alt="Avatar" className="w-20 h-20 rounded-full" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-10 h-10 text-primary" />
                </div>
              )}
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-dark dark:text-white">{session?.user?.name || "Usuario"}</h2>
              <p className="text-sm text-gray-500">{session?.user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">Nombre</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input {...register("name")} className="input-field pl-10" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input {...register("email")} className="input-field pl-10" disabled />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input {...register("phone")} className="input-field pl-10" placeholder="+57 300 000 0000" />
              </div>
            </div>
            <button type="submit" className="btn-primary">Guardar cambios</button>
          </form>
        </div>
      </div>
    </div>
  );
}
