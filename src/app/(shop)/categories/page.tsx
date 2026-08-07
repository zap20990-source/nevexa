"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { name: "Tecnología", slug: "tecnologia", icon: "💻", description: "Computadores, tablets, accesorios y más", count: 156 },
  { name: "Gaming", slug: "gaming", icon: "🎮", description: "Consolas, periféricos, sillas y más", count: 89 },
  { name: "Hogar", slug: "hogar", icon: "🏠", description: "Decoración, muebles, iluminación", count: 234 },
  { name: "Oficina", slug: "oficina", icon: "🖨️", description: "Escritorios, sillas, papelería", count: 112 },
  { name: "Mascotas", slug: "mascotas", icon: "🐾", description: "Alimentos, juguetes, accesorios", count: 78 },
  { name: "Accesorios", slug: "accesorios", icon: "⌚", description: "Relojes, bolsos, lentes", count: 198 },
  { name: "Ropa", slug: "ropa", icon: "👕", description: "Camisetas, chaquetas, zapatos", count: 345 },
  { name: "Herramientas", slug: "herramientas", icon: "🔧", description: "Eléctricas, manuales, jardín", count: 67 },
  { name: "Impresiones 3D", slug: "impresiones-3d", icon: "🖨️", description: "Figuras, piezas personalizadas", count: 45 },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="container-page py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-dark dark:text-white mb-3">
            Categorías
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Explora todas nuestras categorías y encuentra exactamente lo que
            necesitas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/search?category=${cat.slug}`}
                className="card p-6 group flex items-start gap-5 hover:border-primary/30 cursor-pointer"
              >
                <span className="text-4xl flex-shrink-0">{cat.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-dark dark:text-white group-hover:text-primary transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {cat.description}
                  </p>
                  <span className="text-sm text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {cat.count} productos <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
