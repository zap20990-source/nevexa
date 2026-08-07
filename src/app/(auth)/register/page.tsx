"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, User, Phone, Chrome } from "lucide-react";
import { signIn } from "next-auth/react";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || "Error al registrarse");
        return;
      }

      toast.success("¡Cuenta creada exitosamente!");
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
    } catch {
      toast.error("Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="h-12 w-auto">
              <Image
                src="/images/logo.png"
                alt="NEVEXA"
                width={48}
                height={48}
                className="h-full w-auto"
                priority
              />
            </div>
            <span className="text-2xl font-bold font-heading text-dark dark:text-white group-hover:text-primary transition-colors">
              NEVEXA
            </span>
          </Link>
          <h1 className="text-2xl font-bold font-heading text-dark dark:text-white mb-2">
            Crear cuenta
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Únete a NEVEXA y empieza a comprar
          </p>
        </div>

        <div className="card p-8">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-dark dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-6"
          >
            <Chrome className="w-5 h-5" />
            Registrarse con Google
          </button>

          <div className="relative mb-6">
            <hr className="border-gray-200 dark:border-gray-700" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-card px-3 text-sm text-gray-400">
              o con email
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("name")}
                  className="input-field pl-10"
                  placeholder="Tu nombre"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("email")}
                  type="email"
                  className="input-field pl-10"
                  placeholder="tu@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
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

            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="input-field pl-10 pr-10"
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full text-base"
            >
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            Al registrarte aceptas nuestros{" "}
            <a href="#" className="text-primary hover:underline">
              Términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="text-primary hover:underline">
              Política de privacidad
            </a>
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
