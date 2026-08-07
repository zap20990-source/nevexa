"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function RecoverPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Si el email existe, recibirás instrucciones");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-white font-bold">NX</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold font-heading text-dark dark:text-white mb-2">
            Recuperar contraseña
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Te enviaremos instrucciones para restablecerla
          </p>
        </div>

        <div className="card p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-bold text-dark dark:text-white mb-2">
                ¡Revisa tu correo!
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Hemos enviado un enlace de recuperación a {email}
              </p>
              <Link href="/login" className="btn-primary">
                Volver al inicio de sesión
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark dark:text-white mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-10"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full text-base">
                Enviar instrucciones
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          <Link
            href="/login"
            className="text-primary font-medium hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Volver al inicio de sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
