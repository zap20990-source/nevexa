"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Star,
  Grid3X3,
  List,
  ChevronDown,
} from "lucide-react";
import { productsList, getProductSummary } from "@/lib/products";

const categories = ["Todas", "Tecnología", "Gaming", "Oficina", "Accesorios", "Hogar", "Mascotas", "Ropa", "Herramientas"];
const sortOptions = ["Más populares", "Más nuevos", "Precio: menor a mayor", "Precio: mayor a menor", "Más vendidos", "Mejor valorados"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sortBy, setSortBy] = useState("Más populares");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const router = useRouter();

  const allProducts = productsList.map(p => getProductSummary(p.id)!).filter(Boolean);

  const filtered = allProducts
    .filter((p: any) => selectedCategory === "Todas" || p.category === selectedCategory)
    .filter((p: any) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case "Precio: menor a mayor": return a.price - b.price;
        case "Precio: mayor a menor": return b.price - a.price;
        case "Más vendidos": return b.sales - a.sales;
        case "Mejor valorados": return b.rating - a.rating;
        default: return b.sales - a.sales;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-card">
        <div className="container-page py-6">
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-dark dark:text-white mb-4">
            Todos los productos
          </h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline gap-2 sm:w-auto"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field sm:w-auto cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            <div className="hidden sm:flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-primary text-white" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-primary text-white" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="flex gap-8">
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-64 flex-shrink-0 hidden lg:block"
            >
              <div className="card p-5 sticky top-24 space-y-6">
                <div>
                  <h3 className="font-semibold text-dark dark:text-white mb-3">Categorías</h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === cat
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-dark dark:text-white mb-3">Precio</h3>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Mín" className="input-field text-sm py-2" />
                    <input type="number" placeholder="Máx" className="input-field text-sm py-2" />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-sm text-dark dark:text-white">Con descuento</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-sm text-dark dark:text-white">En stock</span>
                </label>
              </div>
            </motion.div>
          )}

          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {filtered.length} producto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
            </p>

            <div className={`grid ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"} gap-4 md:gap-6`}>
              {filtered.map((product, i) => (
                <motion.a
                  key={product.id}
                  href={`/products/${product.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`card group cursor-pointer overflow-hidden ${
                    viewMode === "list" ? "flex gap-4 p-3" : ""
                  }`}
                >
                  <div className={`${viewMode === "list" ? "w-32 h-32 flex-shrink-0" : "aspect-square"} bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-4xl relative`}>
                    {product.comparePrice && (
                      <span className="absolute top-2 left-2 bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                      </span>
                    )}
                    {product.isNew && (
                      <span className="absolute top-2 right-2 bg-success text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Nuevo
                      </span>
                    )}
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {product.image}
                    </motion.span>
                  </div>
                  <div className={`${viewMode === "list" ? "flex-1 py-1" : "p-4"}`}>
                    <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
                    <p className="text-sm font-medium text-dark dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.sales})</span>
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
                      <p className="text-xs text-gray-400 mt-2">{product.stock} en stock</p>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <span className="text-6xl block mb-4">🔍</span>
                <h3 className="text-xl font-bold text-dark dark:text-white mb-2">No encontramos productos</h3>
                <p className="text-gray-500 dark:text-gray-400">Intenta con otros filtros o términos de búsqueda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
