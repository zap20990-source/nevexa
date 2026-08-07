"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Star,
  ArrowLeft,
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { productsList, getProductSummary, categoryInfo } from "@/lib/products";

export default function CategoryPage() {
  const { slug } = useParams();
  const categorySlug = (slug as string) || "";
  const reverseCategoryMap = Object.fromEntries(
    Object.entries(categoryInfo).map(([slug, info]) => [info.name, slug])
  );
  const info = categoryInfo[categorySlug as keyof typeof categoryInfo] || {
    name: "Categoría",
    icon: "📦",
    description: "Explora nuestros productos.",
  };
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const products = productsList
    .filter((p) => reverseCategoryMap[p.category] === categorySlug)
    .map((p) => getProductSummary(p.id))
    .map((p) => p!);
  const is3DCategory = categorySlug === "impresiones-3d";

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="container-page py-8">
        <Link href="/categories" className="btn-ghost gap-2 mb-6 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Todas las categorÃ­as
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">{info.icon}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-heading text-dark dark:text-white">
                {info.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {info.description}
              </p>
            </div>
          </div>
          {is3DCategory && (
            <div className="mt-3 inline-flex items-center gap-2 bg-primary-lighter dark:bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
              Visor 3D interactivo disponible en cada producto
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {products.length} producto{products.length !== 1 ? "s" : ""}{" "}
            encontrado{products.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-2">
            <select className="input-field w-auto text-sm py-2 cursor-pointer">
              <option>MÃ¡s populares</option>
              <option>MÃ¡s nuevos</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
            </select>
            <div className="hidden sm:flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="card p-12 text-center">
            <span className="text-6xl block mb-4">{info.icon}</span>
            <h3 className="text-xl font-bold text-dark dark:text-white mb-2">
              Sin productos aÃºn
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Pronto tendremos productos en esta categorÃ­a.
            </p>
            <Link href="/products" className="btn-primary">
              Ver todos los productos
            </Link>
          </div>
        ) : (
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1"
            } gap-4 md:gap-6`}
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  href={`/products/${product.id}`}
                  className={`card group cursor-pointer overflow-hidden block ${
                    viewMode === "list" ? "flex gap-4 p-3" : ""
                  }`}
                >
                  <div
                    className={`${
                      viewMode === "list"
                        ? "w-32 h-32 flex-shrink-0"
                        : "aspect-square"
                    } bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-4xl relative`}
                  >
                    {product.comparePrice && (
                      <span className="absolute top-2 left-2 bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        -
                        {Math.round(
                          ((product.comparePrice - product.price) /
                            product.comparePrice) *
                            100
                        )}
                        %
                      </span>
                    )}
                    {product.isNew && (
                      <span className="absolute top-2 right-2 bg-success text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Nuevo
                      </span>
                    )}
                    {product.is3D && (
                      <span className="absolute bottom-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        3D
                      </span>
                    )}
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {product.image}
                    </motion.span>
                  </div>
                  <div
                    className={`${
                      viewMode === "list" ? "flex-1 py-1" : "p-4"
                    }`}
                  >
                    <p className="text-xs text-gray-400 mb-1">
                      {product.brand}
                    </p>
                    <p className="text-sm font-medium text-dark dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({product.sales})
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-bold text-dark dark:text-white">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.comparePrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.comparePrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {viewMode === "list" && (
                      <p className="text-xs text-gray-400 mt-2">
                        {product.stock} en stock
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
