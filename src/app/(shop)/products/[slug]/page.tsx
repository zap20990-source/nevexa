"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  RotateCcw,
  Shield,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { useCartStore, useFavoritesStore } from "@/store";
import { WhatsAppButton } from "@/components/shop/WhatsAppButton";
import { NexBanner } from "@/components/nex/Nex";
import Product3DViewer from "@/components/shop/Product3DViewer";
import toast from "react-hot-toast";

const product = {
  id: "1",
  name: "Audífonos Pro",
  description:
    "Experimenta un sonido envolvente con los nuevos Audífonos Pro. Diseñados con tecnología de cancelación de ruido activa, drivers de neodimio de 40mm y almohadillas de memory foam para máxima comodidad durante horas de uso.\n\nPerfectos para gaming, producción musical o simplemente disfrutar de tu música favorita con una calidad de audio excepcional.",
  price: 299900,
  comparePrice: 499900,
  sku: "AUD-PRO-001",
  stock: 50,
  rating: 4.8,
  reviewCount: 234,
  sales: 1234,
  brand: "AudioTech",
  category: "Tecnología",
  has3D: false,
  modelUrl: undefined,
  images: ["🎧", "🎵", "🎼", "🎤"],
  variants: [
    { id: "v1", name: "Color", value: "Negro", stock: 20, price: null },
    { id: "v2", name: "Color", value: "Blanco", stock: 15, price: null },
    { id: "v3", name: "Color", value: "Azul", stock: 10, price: 29900 },
  ],
  features: [
    "Cancelación de ruido activa",
    "Bluetooth 5.3",
    "40 horas de batería",
    "Carga rápida USB-C",
    "Almohadillas memory foam",
    "Micrófono incorporado",
  ],
  reviews: [
    { id: "r1", name: "Carlos M.", rating: 5, title: "¡Increíble calidad!", comment: "Los mejores audífonos que he tenido. La cancelación de ruido es espectacular y la batería dura muchísimo. 100% recomendados.", date: "2024-12-15" },
    { id: "r2", name: "Ana G.", rating: 5, title: "Perfectos para gaming", comment: "Los uso para jugar y la calidad del sonido es impresionante. Puedo escuchar cada detalle del juego. Muy cómodos para sesiones largas.", date: "2024-12-10" },
    { id: "r3", name: "Pedro L.", rating: 4, title: "Muy buenos", comment: "Excelente calidad de construcción y sonido. Les doy 4 estrellas porque el estuche podría ser más compacto.", date: "2024-11-28" },
  ],
  relatedProducts: [
    { id: "3", name: "Mouse Gaming", price: 149900, image: "🖱️", rating: 4.9 },
    { id: "2", name: "Teclado Mecánico RGB", price: 189900, image: "⌨️", rating: 4.7 },
    { id: "7", name: "Cámara Web 4K", price: 349900, image: "📸", rating: 4.4 },
    { id: "12", name: "Auriculares Bluetooth", price: 159900, image: "🎵", rating: 4.7 },
  ],
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0].id);
  const [viewMode, setViewMode] = useState<"gallery" | "3d">(product.has3D ? "3d" : "gallery");
  const addItem = useCartStore((s) => s.addItem);
  const { isFavorite, toggle } = useFavoritesStore();
  const fav = isFavorite(product.id);

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!session) {
      router.push("/login");
      toast.error("Inicia sesión para agregar productos al carrito");
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      variantId: selectedVariant,
      variantName: product.variants.find((v) => v.id === selectedVariant)?.value,
    });
    toast.success(`${product.name} agregado al carrito`);
  };

  const handleWhatsAppBuy = () => {
    const variant = product.variants.find((v) => v.id === selectedVariant);
    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573000000000"}?text=${encodeURIComponent(
        `¡Hola NEVEXA! 👋\n\nQuiero comprar:\n• ${product.name}${variant ? ` - ${variant.value}` : ""}\nCantidad: ${quantity}\nTotal: $${(product.price * quantity).toLocaleString()}\n\n¡Gracias!`
      )}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-dark">
      <div className="container-page py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery / 3D Viewer */}
          <div>
            {product.has3D && (
              <div className="flex gap-1 mb-3">
                <button
                  onClick={() => setViewMode("gallery")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    viewMode === "gallery"
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                  }`}
                >
                  Galería
                </button>
                <button
                  onClick={() => setViewMode("3d")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                    viewMode === "3d"
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                  }`}
                >
                  Vista 3D
                </button>
              </div>
            )}

            {viewMode === "3d" && product.has3D ? (
              <Product3DViewer type="figure" modelUrl={product.modelUrl} />
            ) : (
              <>
                <div className="card overflow-hidden aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-[120px] relative">
                  {discount > 0 && (
                    <span className="absolute top-4 left-4 bg-danger text-white text-sm font-bold px-3 py-1 rounded-full">
                      -{discount}%
                    </span>
                  )}
                  <button
                    onClick={() => toggle(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Heart className={`w-5 h-5 ${fav ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                  </button>
                  <motion.span
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {product.images[selectedImage]}
                  </motion.span>
                </div>
                <div className="flex gap-2 mt-4">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-xl border-2 transition-all bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-2xl ${
                        selectedImage === i
                          ? "border-primary"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      {img}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-sm text-primary font-medium mb-1">{product.brand}</p>
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-dark dark:text-white mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-dark dark:text-white">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviewCount} reseñas)</span>
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm text-gray-400">{product.sales} vendidos</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-dark dark:text-white">
                ${product.price.toLocaleString()}
              </span>
              {product.comparePrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.comparePrice.toLocaleString()}
                </span>
              )}
              {discount > 0 && (
                <span className="text-sm font-bold text-danger bg-danger/10 px-2 py-0.5 rounded-full">
                  Ahorras {discount}%
                </span>
              )}
            </div>

            {/* Variants */}
            <div className="mb-6">
              <p className="text-sm font-medium text-dark dark:text-white mb-2">
                Color: <span className="text-gray-500">{product.variants.find((v) => v.id === selectedVariant)?.value}</span>
              </p>
              <div className="flex gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedVariant === variant.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-200 dark:border-gray-700 text-dark dark:text-white hover:border-gray-400"
                    } ${variant.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={variant.stock === 0}
                  >
                    {variant.value}
                    {variant.stock <= 5 && variant.stock > 0 && (
                      <span className="text-xs text-orange-500 block">Quedan {variant.stock}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-medium text-dark dark:text-white mb-2">Cantidad</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 min-w-[40px] text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-400">{product.stock} disponibles</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button onClick={handleAddToCart} className="btn-primary flex-1 gap-2 text-base">
                <ShoppingCart className="w-5 h-5" />
                Agregar al carrito
              </button>
              <WhatsAppButton
                product={{ name: product.name, price: product.price }}
                variant="inline"
                label="Comprar por WhatsApp"
              />
              <button className="btn-ghost p-3">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Truck, text: "Envío gratis +$200k" },
                { icon: RotateCcw, text: "Devolución 30 días" },
                { icon: Shield, text: "Garantía 1 año" },
                { icon: MessageCircle, text: "Soporte 24/7" },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <f.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  {f.text}
                </div>
              ))}
            </div>

            {/* Features list */}
            <div className="card p-5 mb-8">
              <h3 className="font-semibold text-dark dark:text-white mb-3">Características</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Description & Reviews */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-bold font-heading text-dark dark:text-white mb-4">
                Descripción
              </h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {product.description}
              </div>
            </div>

            <div className="card p-6 mb-6">
              <h2 className="text-xl font-bold font-heading text-dark dark:text-white mb-4">
                Reseñas ({product.reviewCount})
              </h2>
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-dark dark:text-white text-sm">{review.name}</p>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.title && (
                      <p className="font-medium text-dark dark:text-white text-sm mb-1">{review.title}</p>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <NexBanner />

            <div className="card p-5">
              <h3 className="font-semibold text-dark dark:text-white mb-4">Productos relacionados</h3>
              <div className="space-y-3">
                {product.relatedProducts.map((rp) => (
                  <a
                    key={rp.id}
                    href={`/products/${rp.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl flex-shrink-0">
                      {rp.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-dark dark:text-white group-hover:text-primary transition-colors truncate">
                        {rp.name}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-500">{rp.rating}</span>
                      </div>
                      <p className="text-sm font-bold text-dark dark:text-white mt-0.5">
                        ${rp.price.toLocaleString()}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
