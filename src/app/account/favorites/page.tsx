"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Heart, Star, X } from "lucide-react";
import { useFavoritesStore } from "@/store";

const allProducts: Record<string, any> = {
  "1": { name: "Audífonos Pro", price: 299900, comparePrice: 499900, image: "🎧", rating: 4.8 },
  "2": { name: "Teclado Mecánico RGB", price: 189900, comparePrice: 299900, image: "⌨️", rating: 4.7 },
  "3": { name: "Mouse Gaming", price: 149900, image: "🖱️", rating: 4.9 },
  "4": { name: "Monitor 27\" 4K", price: 1249900, comparePrice: 1599900, image: "🖥️", rating: 4.6 },
  "5": { name: "Silla Ergonómica", price: 899900, image: "💺", rating: 4.5 },
  "6": { name: "Impresora 3D Pro", price: 1899900, comparePrice: 2499900, image: "🖨️", rating: 4.8 },
};

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const { items, toggle } = useFavoritesStore();

  if (status === "unauthenticated") redirect("/login");
  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><div className="skeleton w-8 h-8 rounded-full" /></div>;

  const favoriteProducts = items.map((id) => ({ id, ...allProducts[id] })).filter(Boolean);

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
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <X className="w-4 h-4 text-gray-400" />
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
