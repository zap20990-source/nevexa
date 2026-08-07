"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

const allProducts: Record<string, any> = {
  "1": { name: "Audífonos Pro", price: 299900, comparePrice: 499900, image: "🎧", rating: 4.8 },
  "2": { name: "Teclado Mecánico RGB", price: 189900, comparePrice: 299900, image: "⌨️", rating: 4.7 },
  "3": { name: "Mouse Gaming", price: 149900, image: "🖱️", rating: 4.9 },
  "4": { name: "Monitor 27\" 4K", price: 1249900, comparePrice: 1599900, image: "🖥️", rating: 4.6 },
  "5": { name: "Silla Ergonómica", price: 899900, image: "💺", rating: 4.5 },
  "6": { name: "Impresora 3D Pro", price: 1899900, comparePrice: 2499900, image: "🖨️", rating: 4.8 },
  "7": { name: "Cámara Web 4K", price: 349900, comparePrice: 449900, image: "📸", rating: 4.4 },
  "8": { name: "Hub USB-C", price: 89900, image: "🔌", rating: 4.3 },
  "9": { name: "Lámpara LED Escritorio", price: 79900, comparePrice: 129900, image: "💡", rating: 4.2 },
  "10": { name: "Mochila Antirrobo", price: 159900, image: "🎒", rating: 4.6 },
  "11": { name: "Cargador Inalámbrico", price: 49900, comparePrice: 79900, image: "🔋", rating: 4.1 },
  "12": { name: "Auriculares Bluetooth", price: 159900, comparePrice: 249900, image: "🎵", rating: 4.7 },
  "13": { name: "Figura 3D Dragón", price: 49900, image: "🐉", rating: 4.9 },
  "14": { name: "Portalápices Geométrico", price: 29900, comparePrice: 39900, image: "🖊️", rating: 4.6 },
  "15": { name: "Soporte para Celular", price: 19900, image: "📱", rating: 4.7 },
  "16": { name: "Maceta Geométrica", price: 34900, comparePrice: 49900, image: "🪴", rating: 4.5 },
  "17": { name: "Comedero para Mascotas", price: 59900, image: "🐕", rating: 4.4 },
  "18": { name: "Juguete Interactivo", price: 29900, comparePrice: 39900, image: "🎾", rating: 4.3 },
  "19": { name: "Camiseta Premium", price: 89900, image: "👕", rating: 4.5 },
  "20": { name: "Chaqueta Deportiva", price: 189900, comparePrice: 249900, image: "🧥", rating: 4.6 },
  "21": { name: "Taladro Inalámbrico", price: 249900, comparePrice: 349900, image: "🔧", rating: 4.7 },
  "22": { name: "Juego de Destornilladores", price: 59900, image: "🪛", rating: 4.4 },
  "23": { name: "Cojín Decorativo", price: 39900, image: "🛋️", rating: 4.2 },
  "24": { name: "Set de Velas Aromáticas", price: 49900, comparePrice: 69900, image: "🕯️", rating: 4.5 },
};

export default function FavoritesPage() {
  const { items, toggle } = useFavorites();

  const favoriteProducts = items
    .map((id) => {
      const product = allProducts[id];
      return product ? { id, ...product } : null;
    })
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="container-page py-8">
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-dark dark:text-white mb-8">
          Mis favoritos
        </h1>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { href: "/account/orders", label: "Pedidos" },
            { href: "/account/profile", label: "Perfil" },
            { href: "/account/favorites", label: "Favoritos", active: true },
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

        {favoriteProducts.length === 0 ? (
          <div className="card p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark dark:text-white mb-2">Sin favoritos</h3>
            <p className="text-gray-500 mb-4">Guarda productos que te gusten para verlos después</p>
            <Link href="/products" className="btn-primary">Explorar productos</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoriteProducts.map((product: any) => (
              <div key={product.id} className="card overflow-hidden group relative">
                <button
                  onClick={() => toggle(product.id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                >
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                </button>
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-5xl">
                    {product.image}
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-dark dark:text-white group-hover:text-primary line-clamp-2">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-500">{product.rating}</span>
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
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
