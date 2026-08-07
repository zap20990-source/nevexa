"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { productsDB } from "@/lib/products";

export default function FavoritesPage() {
  const { items, toggle } = useFavorites();

  const favoriteProducts = items
    .map((id) => {
      const product = productsDB[id];
      if (!product) return null;
      return { ...product, image: product.images[0] };
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
