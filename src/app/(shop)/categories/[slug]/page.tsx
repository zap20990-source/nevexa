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

const allProducts = [
  {
    id: "1",
    name: "Audífonos Pro",
    category: "tecnologia",
    brand: "AudioTech",
    price: 299900,
    comparePrice: 499900,
    rating: 4.8,
    sales: 1234,
    image: "🎧",
    stock: 50,
    isNew: true,
    is3D: false,
  },
  {
    id: "2",
    name: "Teclado Mecánico RGB",
    category: "gaming",
    brand: "KeyPro",
    price: 189900,
    comparePrice: 299900,
    rating: 4.7,
    sales: 856,
    image: "⌨️",
    stock: 30,
    isNew: false,
    is3D: false,
  },
  {
    id: "3",
    name: "Mouse Gaming",
    category: "gaming",
    brand: "GameMax",
    price: 149900,
    comparePrice: null,
    rating: 4.9,
    sales: 2341,
    image: "🖱️",
    stock: 100,
    isNew: true,
    is3D: false,
  },
  {
    id: "4",
    name: "Monitor 27\" 4K",
    category: "tecnologia",
    brand: "ViewPro",
    price: 1249900,
    comparePrice: 1599900,
    rating: 4.6,
    sales: 432,
    image: "🖥️",
    stock: 15,
    isNew: false,
    is3D: false,
  },
  {
    id: "5",
    name: "Silla Ergonómica",
    category: "oficina",
    brand: "ErgoPlus",
    price: 899900,
    comparePrice: null,
    rating: 4.5,
    sales: 678,
    image: "💺",
    stock: 20,
    isNew: true,
    is3D: false,
  },
  {
    id: "6",
    name: "Impresora 3D Pro",
    category: "impresiones-3d",
    brand: "PrintMax",
    price: 1899900,
    comparePrice: 2499900,
    rating: 4.8,
    sales: 234,
    image: "🖨️",
    stock: 8,
    isNew: true,
    is3D: true,
  },
  {
    id: "7",
    name: "Cámara Web 4K",
    category: "tecnologia",
    brand: "ViewPro",
    price: 349900,
    comparePrice: 449900,
    rating: 4.4,
    sales: 987,
    image: "📸",
    stock: 45,
    isNew: false,
    is3D: false,
  },
  {
    id: "8",
    name: "Hub USB-C",
    category: "accesorios",
    brand: "TechLink",
    price: 89900,
    comparePrice: null,
    rating: 4.3,
    sales: 1543,
    image: "🔌",
    stock: 200,
    isNew: false,
    is3D: false,
  },
  {
    id: "9",
    name: "Lámpara LED Escritorio",
    category: "oficina",
    brand: "LightPro",
    price: 79900,
    comparePrice: 129900,
    rating: 4.2,
    sales: 321,
    image: "💡",
    stock: 60,
    isNew: true,
    is3D: false,
  },
  {
    id: "10",
    name: "Mochila Antirrobo",
    category: "accesorios",
    brand: "SafeBag",
    price: 159900,
    comparePrice: null,
    rating: 4.6,
    sales: 567,
    image: "🎒",
    stock: 35,
    isNew: false,
    is3D: false,
  },
  {
    id: "11",
    name: "Cargador Inalámbrico",
    category: "accesorios",
    brand: "TechLink",
    price: 49900,
    comparePrice: 79900,
    rating: 4.1,
    sales: 2109,
    image: "🔋",
    stock: 150,
    isNew: false,
    is3D: false,
  },
  {
    id: "12",
    name: "Auriculares Bluetooth",
    category: "tecnologia",
    brand: "AudioTech",
    price: 159900,
    comparePrice: 249900,
    rating: 4.7,
    sales: 1890,
    image: "🎵",
    stock: 75,
    isNew: true,
    is3D: false,
  },
  {
    id: "13",
    name: "Figura 3D Dragón",
    category: "impresiones-3d",
    brand: "PrintMax",
    price: 49900,
    comparePrice: null,
    rating: 4.9,
    sales: 567,
    image: "🐉",
    stock: 25,
    isNew: true,
    is3D: true,
  },
  {
    id: "14",
    name: "Portalápices Geométrico",
    category: "impresiones-3d",
    brand: "PrintMax",
    price: 29900,
    comparePrice: 39900,
    rating: 4.6,
    sales: 432,
    image: "🖊️",
    stock: 50,
    isNew: true,
    is3D: true,
  },
  {
    id: "15",
    name: "Soporte para Celular",
    category: "impresiones-3d",
    brand: "PrintMax",
    price: 19900,
    comparePrice: null,
    rating: 4.7,
    sales: 892,
    image: "📱",
    stock: 100,
    isNew: false,
    is3D: true,
  },
  {
    id: "16",
    name: "Maceta Geométrica",
    category: "impresiones-3d",
    brand: "PrintMax",
    price: 34900,
    comparePrice: 49900,
    rating: 4.5,
    sales: 321,
    image: "🪴",
    stock: 40,
    isNew: true,
    is3D: true,
  },
  {
    id: "17",
    name: "Comedero para Mascotas",
    category: "mascotas",
    brand: "PetPro",
    price: 59900,
    comparePrice: null,
    rating: 4.4,
    sales: 654,
    image: "🐕",
    stock: 45,
    isNew: false,
    is3D: false,
  },
  {
    id: "18",
    name: "Juguete Interactivo",
    category: "mascotas",
    brand: "PetPro",
    price: 29900,
    comparePrice: 39900,
    rating: 4.3,
    sales: 1209,
    image: "🎾",
    stock: 80,
    isNew: true,
    is3D: false,
  },
  {
    id: "19",
    name: "Camiseta Premium",
    category: "ropa",
    brand: "StyleMax",
    price: 89900,
    comparePrice: null,
    rating: 4.5,
    sales: 2100,
    image: "👕",
    stock: 200,
    isNew: true,
    is3D: false,
  },
  {
    id: "20",
    name: "Chaqueta Deportiva",
    category: "ropa",
    brand: "StyleMax",
    price: 189900,
    comparePrice: 249900,
    rating: 4.6,
    sales: 876,
    image: "🧥",
    stock: 60,
    isNew: false,
    is3D: false,
  },
  {
    id: "21",
    name: "Taladro Inalámbrico",
    category: "herramientas",
    brand: "PowerTool",
    price: 249900,
    comparePrice: 349900,
    rating: 4.7,
    sales: 543,
    image: "🔧",
    stock: 35,
    isNew: true,
    is3D: false,
  },
  {
    id: "22",
    name: "Juego de Destornilladores",
    category: "herramientas",
    brand: "PowerTool",
    price: 59900,
    comparePrice: null,
    rating: 4.4,
    sales: 3210,
    image: "🪛",
    stock: 150,
    isNew: false,
    is3D: false,
  },
  {
    id: "23",
    name: "Cojín Decorativo",
    category: "hogar",
    brand: "HomeStyle",
    price: 39900,
    comparePrice: null,
    rating: 4.2,
    sales: 4567,
    image: "🛋️",
    stock: 300,
    isNew: false,
    is3D: false,
  },
  {
    id: "24",
    name: "Set de Velas Aromáticas",
    category: "hogar",
    brand: "HomeStyle",
    price: 49900,
    comparePrice: 69900,
    rating: 4.5,
    sales: 2341,
    image: "🕯️",
    stock: 120,
    isNew: true,
    is3D: false,
  },
];

const categoryInfo: Record<
  string,
  { name: string; icon: string; description: string }
> = {
  tecnologia: {
    name: "Tecnología",
    icon: "💻",
    description:
      "Lo último en computadores, tablets, accesorios y gadgets tecnológicos.",
  },
  gaming: {
    name: "Gaming",
    icon: "🎮",
    description:
      "Consolas, periféricos, sillas gamer y todo para el mejor setup.",
  },
  hogar: {
    name: "Hogar",
    icon: "🏠",
    description:
      "Decoración, muebles, iluminación y todo para tu espacio perfecto.",
  },
  oficina: {
    name: "Oficina",
    icon: "🖨️",
    description:
      "Escritorios, sillas ergonómicas, papelería y equipos de oficina.",
  },
  accesorios: {
    name: "Accesorios",
    icon: "⌚",
    description:
      "Relojes, bolsos, lentes, cargadores y accesorios esenciales.",
  },
  mascotas: {
    name: "Mascotas",
    icon: "🐾",
    description:
      "Alimentos, juguetes, accesorios y todo para consentir a tu mascota.",
  },
  ropa: {
    name: "Ropa",
    icon: "👕",
    description:
      "Camisetas, chaquetas, zapatos y moda para todas las ocasiones.",
  },
  herramientas: {
    name: "Herramientas",
    icon: "🔧",
    description:
      "Herramientas eléctricas, manuales, jardinería y más.",
  },
  "impresiones-3d": {
    name: "Impresiones 3D",
    icon: "🖨️",
    description:
      "Figuras, piezas personalizadas, decoración y productos impresos en 3D con la más alta calidad.",
  },
};

export default function CategoryPage() {
  const { slug } = useParams();
  const categorySlug = (slug as string) || "";
  const info = categoryInfo[categorySlug] || {
    name: "Categoría",
    icon: "📦",
    description: "Explora nuestros productos.",
  };
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const products = allProducts.filter((p) => p.category === categorySlug);
  const is3DCategory = categorySlug === "impresiones-3d";

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="container-page py-8">
        <Link href="/categories" className="btn-ghost gap-2 mb-6 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Todas las categorías
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
              <option>Más populares</option>
              <option>Más nuevos</option>
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
              Sin productos aún
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Pronto tendremos productos en esta categoría.
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
