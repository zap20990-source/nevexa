"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Star, X } from "lucide-react";
import Link from "next/link";

const allProducts = [
  { id: "1", name: "Audífonos Pro", category: "Tecnología", brand: "AudioTech", price: 299900, comparePrice: 499900, rating: 4.8, sales: 1234, image: "🎧", stock: 50, isNew: true },
  { id: "2", name: "Teclado Mecánico RGB", category: "Gaming", brand: "KeyPro", price: 189900, comparePrice: 299900, rating: 4.7, sales: 856, image: "⌨️", stock: 30, isNew: false },
  { id: "3", name: "Mouse Gaming", category: "Gaming", brand: "GameMax", price: 149900, comparePrice: null, rating: 4.9, sales: 2341, image: "🖱️", stock: 100, isNew: true },
  { id: "4", name: "Monitor 27\" 4K", category: "Tecnología", brand: "ViewPro", price: 1249900, comparePrice: 1599900, rating: 4.6, sales: 432, image: "🖥️", stock: 15, isNew: false },
  { id: "5", name: "Silla Ergonómica", category: "Oficina", brand: "ErgoPlus", price: 899900, comparePrice: null, rating: 4.5, sales: 678, image: "💺", stock: 20, isNew: true },
  { id: "6", name: "Impresora 3D Pro", category: "Tecnología", brand: "PrintMax", price: 1899900, comparePrice: 2499900, rating: 4.8, sales: 234, image: "🖨️", stock: 8, isNew: true },
  { id: "7", name: "Cámara Web 4K", category: "Tecnología", brand: "ViewPro", price: 349900, comparePrice: 449900, rating: 4.4, sales: 987, image: "📸", stock: 45, isNew: false },
  { id: "8", name: "Hub USB-C", category: "Accesorios", brand: "TechLink", price: 89900, comparePrice: null, rating: 4.3, sales: 1543, image: "🔌", stock: 200, isNew: false },
  { id: "9", name: "Lámpara LED Escritorio", category: "Oficina", brand: "LightPro", price: 79900, comparePrice: 129900, rating: 4.2, sales: 321, image: "💡", stock: 60, isNew: true },
  { id: "10", name: "Mochila Antirrobo", category: "Accesorios", brand: "SafeBag", price: 159900, comparePrice: null, rating: 4.6, sales: 567, image: "🎒", stock: 35, isNew: false },
  { id: "11", name: "Cargador Inalámbrico", category: "Accesorios", brand: "TechLink", price: 49900, comparePrice: 79900, rating: 4.1, sales: 2109, image: "🔋", stock: 150, isNew: false },
  { id: "12", name: "Auriculares Bluetooth", category: "Tecnología", brand: "AudioTech", price: 159900, comparePrice: 249900, rating: 4.7, sales: 1890, image: "🎵", stock: 75, isNew: true },
];

const categories = [...new Set(allProducts.map((p) => p.category))];
const brands = [...new Set(allProducts.map((p) => p.brand))];
const sortOptions = [
  { value: "popular", label: "Más populares" },
  { value: "newest", label: "Más nuevos" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [discountOnly, setDiscountOnly] = useState(false);

  const [suggestions, setSuggestions] = useState<typeof allProducts>([]);

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  let filtered = allProducts.filter((p) => {
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    const matchesMinPrice = !minPrice || p.price >= Number(minPrice);
    const matchesMaxPrice = !maxPrice || p.price <= Number(maxPrice);
    const matchesDiscount = !discountOnly || p.comparePrice !== null;
    return matchesQuery && matchesCategory && matchesBrand && matchesMinPrice && matchesMaxPrice && matchesDiscount;
  });

  switch (sortBy) {
    case "price-asc": filtered.sort((a, b) => a.price - b.price); break;
    case "price-desc": filtered.sort((a, b) => b.price - a.price); break;
    case "rating": filtered.sort((a, b) => b.rating - a.rating); break;
    case "newest": filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1)); break;
    default: filtered.sort((a, b) => b.sales - a.sales);
  }

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("popular");
    setDiscountOnly(false);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    minPrice ||
    maxPrice ||
    discountOnly;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="container-page py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="input-field pl-12 py-4 text-lg"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {suggestions.length > 0 && query.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card mt-2 p-2 absolute z-30 w-full max-w-2xl mx-auto left-0 right-0"
            >
              {suggestions.map((s) => (
                <Link
                  key={s.id}
                  href={`/products/${s.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <span className="text-2xl">{s.image}</span>
                  <div>
                    <p className="text-sm font-medium text-dark dark:text-white">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.category} · ${s.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-outline gap-2 text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field w-auto text-sm py-2 cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="btn-ghost text-sm text-red-500">
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="flex gap-8">
          {showFilters && (
            <div className="w-64 flex-shrink-0 hidden lg:block">
              <div className="card p-5 sticky top-24 space-y-6">
                <div>
                  <h3 className="font-semibold text-dark dark:text-white mb-3">Categorías</h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer py-1">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-dark dark:text-white">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-dark dark:text-white mb-3">Marcas</h3>
                  <div className="space-y-1">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer py-1">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-dark dark:text-white">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-dark dark:text-white mb-3">Precio</h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="Mín"
                      className="input-field text-sm py-2"
                    />
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="Máx"
                      className="input-field text-sm py-2"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={discountOnly}
                    onChange={(e) => setDiscountOnly(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-dark dark:text-white">Con descuento</span>
                </label>
              </div>
            </div>
          )}

          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
              {query ? ` para "${query}"` : ""}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product, i) => (
                <motion.a
                  key={product.id}
                  href={`/products/${product.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="card group cursor-pointer overflow-hidden"
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-5xl relative">
                    {product.comparePrice && (
                      <span className="absolute top-2 left-2 bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                      </span>
                    )}
                    <motion.span whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                      {product.image}
                    </motion.span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
                    <p className="text-sm font-medium text-dark dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{product.rating}</span>
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
                  </div>
                </motion.a>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <span className="text-6xl block mb-4">🔍</span>
                <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Sin resultados</h3>
                <p className="text-gray-500 dark:text-gray-400">Prueba con otros términos o revisa los filtros.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
