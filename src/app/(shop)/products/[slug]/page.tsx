// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { useCartStore } from "@/store";
import { useFavorites } from "@/hooks/useFavorites";
import { WhatsAppButton } from "@/components/shop/WhatsAppButton";
import { NexBanner } from "@/components/nex/Nex";
import Product3DViewer from "@/components/shop/Product3DViewer";
import toast from "react-hot-toast";

const productsData: Record<string, any> = {
  "1": {
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
      { id: "r1", name: "Carlos M.", rating: 5, title: "¡Increíble calidad!", comment: "Los mejores audífonos que he tenido.", date: "2024-12-15" },
      { id: "r2", name: "Ana G.", rating: 5, title: "Perfectos para gaming", comment: "La calidad del sonido es impresionante.", date: "2024-12-10" },
      { id: "r3", name: "Pedro L.", rating: 4, title: "Muy buenos", comment: "Excelente calidad. El estuche podría ser más compacto.", date: "2024-11-28" },
    ],
    relatedProducts: [
      { id: "3", name: "Mouse Gaming", price: 149900, image: "🖱️", rating: 4.9 },
      { id: "2", name: "Teclado Mecánico RGB", price: 189900, image: "⌨️", rating: 4.7 },
      { id: "7", name: "Cámara Web 4K", price: 349900, image: "📸", rating: 4.4 },
      { id: "12", name: "Auriculares Bluetooth", price: 159900, image: "🎵", rating: 4.7 },
    ],
  },
  "6": {
    id: "6",
    name: "Impresora 3D Pro",
    description:
      "Impresora 3D de alta precisión ideal para creadores, diseñadores y entusiastas. Tecnología FDM con volumen de impresión de 220x220x250mm, pantalla táctil a color y nivelación automática.\n\nCompatible con PLA, ABS, PETG y TPU. Perfecta para prototipado rápido, piezas personalizadas y proyectos educativos.",
    price: 1899900,
    comparePrice: 2499900,
    sku: "3DP-PRO-001",
    stock: 8,
    rating: 4.8,
    reviewCount: 56,
    sales: 234,
    brand: "PrintMax",
    category: "Impresiones 3D",
    has3D: true,
    modelUrl: "/models/helmet.glb",
    images: ["🖨️", "⚙️", "🎯", "🔩"],
    variants: [
      { id: "v6a", name: "Color", value: "Negro", stock: 5, price: null },
      { id: "v6b", name: "Color", value: "Gris", stock: 3, price: null },
    ],
    features: [
      "Volumen de impresión 220x220x250mm",
      "Pantalla táctil a color",
      "Nivelación automática",
      "Compatible PLA, ABS, PETG, TPU",
      "Reanudación tras corte de luz",
      "Sensor de filamento",
    ],
    reviews: [
      { id: "r4", name: "Diego R.", rating: 5, title: "Excelente impresora", comment: "Fácil de armar, excelente calidad de impresión. La uso para mis proyectos de la universidad.", date: "2024-12-05" },
      { id: "r5", name: "Sofía M.", rating: 4, title: "Muy buena relación calidad-precio", comment: "Buena impresora para empezar. La nivelación automática es un plus enorme.", date: "2024-11-20" },
    ],
    relatedProducts: [
      { id: "13", name: "Figura 3D Dragón", price: 49900, image: "🐉", rating: 4.9 },
      { id: "14", name: "Portalápices Geométrico", price: 29900, image: "🖊️", rating: 4.6 },
      { id: "15", name: "Soporte para Celular", price: 19900, image: "📱", rating: 4.7 },
      { id: "16", name: "Maceta Geométrica", price: 34900, image: "🪴", rating: 4.5 },
    ],
  },
  "13": {
    id: "13",
    name: "Figura 3D Dragón",
    description:
      "Impresionante figura de dragón impresa en 3D con filamento PLA de alta calidad. Diseño detallado con escamas, alas articuladas y postura dinámica. Perfecta para coleccionistas, decoración de escritorio o regalo único.\n\nDisponible en varios colores. Cada pieza es revisada a mano para garantizar la mejor calidad.",
    price: 49900,
    comparePrice: null,
    sku: "3DP-FIG-DRAGON",
    stock: 25,
    rating: 4.9,
    reviewCount: 89,
    sales: 567,
    brand: "PrintMax",
    category: "Impresiones 3D",
    has3D: true,
    modelUrl: "/models/helmet.glb",
    images: ["🐉", "✨", "🎨", "📐"],
    variants: [
      { id: "v13a", name: "Color", value: "Rojo", stock: 10, price: null },
      { id: "v13b", name: "Color", value: "Verde", stock: 8, price: null },
      { id: "v13c", name: "Color", value: "Dorado", stock: 7, price: 9900 },
    ],
    features: [
      "Filamento PLA de alta calidad",
      "Diseño articulado",
      "Acabado detallado",
      "Revisado a mano",
      "Ideal para coleccionistas",
      "Empaque de regalo incluido",
    ],
    reviews: [
      { id: "r6", name: "Martín L.", rating: 5, title: "Increíble detalle", comment: "El nivel de detalle es asombroso. Mis amigos no pueden creer que sea impreso en 3D.", date: "2024-12-18" },
      { id: "r7", name: "Valentina C.", rating: 5, title: "Regalo perfecto", comment: "Lo compré para mi novio y le encantó. Las alas se mueven y todo.", date: "2024-12-12" },
    ],
    relatedProducts: [
      { id: "6", name: "Impresora 3D Pro", price: 1899900, image: "🖨️", rating: 4.8 },
      { id: "14", name: "Portalápices Geométrico", price: 29900, image: "🖊️", rating: 4.6 },
      { id: "15", name: "Soporte para Celular", price: 19900, image: "📱", rating: 4.7 },
      { id: "16", name: "Maceta Geométrica", price: 34900, image: "🪴", rating: 4.5 },
    ],
  },
  "14": {
    id: "14",
    name: "Portalápices Geométrico",
    description:
      "Portalápices con diseño geométrico moderno impreso en 3D. Forma de panal hexagonal que organiza tus bolígrafos, lápices y herramientas de escritorio con estilo. Fabricado en PLA resistente con acabado mate.\n\nPerfecto para tu setup de oficina o estudio. Compacto pero con capacidad para 8-10 bolígrafos.",
    price: 29900,
    comparePrice: 39900,
    sku: "3DP-PORTALAPICES",
    stock: 50,
    rating: 4.6,
    reviewCount: 45,
    sales: 432,
    brand: "PrintMax",
    category: "Impresiones 3D",
    has3D: true,
    modelUrl: "/models/helmet.glb",
    images: ["🖊️", "⬡", "📐", "✨"],
    variants: [
      { id: "v14a", name: "Color", value: "Blanco mate", stock: 20, price: null },
      { id: "v14b", name: "Color", value: "Negro mate", stock: 18, price: null },
      { id: "v14c", name: "Color", value: "Gris", stock: 12, price: null },
    ],
    features: [
      "Diseño geométrico hexagonal",
      "PLA resistente",
      "Acabado mate",
      "Capacidad 8-10 bolígrafos",
      "Base antideslizante",
      "Compacto y elegante",
    ],
    reviews: [
      { id: "r8", name: "Lucía P.", rating: 5, title: "Hermoso diseño", comment: "Queda perfecto en mi escritorio. El diseño es muy moderno.", date: "2024-12-08" },
    ],
    relatedProducts: [
      { id: "6", name: "Impresora 3D Pro", price: 1899900, image: "🖨️", rating: 4.8 },
      { id: "13", name: "Figura 3D Dragón", price: 49900, image: "🐉", rating: 4.9 },
      { id: "16", name: "Maceta Geométrica", price: 34900, image: "🪴", rating: 4.5 },
    ],
  },
  "15": {
    id: "15",
    name: "Soporte para Celular",
    description:
      "Soporte ajustable para celular impreso en 3D. Diseño minimalista y funcional, compatible con cualquier smartphone. Ángulo de visión óptimo para videollamadas, ver contenido o seguir recetas mientras cocinas.\n\nLigero, portátil y plegable. Cabe en cualquier bolsillo o mochila.",
    price: 19900,
    comparePrice: null,
    sku: "3DP-SOPORTE",
    stock: 100,
    rating: 4.7,
    reviewCount: 112,
    sales: 892,
    brand: "PrintMax",
    category: "Impresiones 3D",
    has3D: true,
    modelUrl: "/models/helmet.glb",
    images: ["📱", "🔧", "📐", "✋"],
    variants: [
      { id: "v15a", name: "Color", value: "Negro", stock: 50, price: null },
      { id: "v15b", name: "Color", value: "Blanco", stock: 50, price: null },
    ],
    features: [
      "Compatible con cualquier smartphone",
      "Ángulo ajustable",
      "Plegable y portátil",
      "PLA resistente",
      "Base antideslizante",
      "Diseño minimalista",
    ],
    reviews: [
      { id: "r9", name: "Andrés G.", rating: 5, title: "Práctico y bonito", comment: "Lo uso todos los días. Muy práctico y se ve bien en cualquier lugar.", date: "2024-12-22" },
    ],
    relatedProducts: [
      { id: "6", name: "Impresora 3D Pro", price: 1899900, image: "🖨️", rating: 4.8 },
      { id: "13", name: "Figura 3D Dragón", price: 49900, image: "🐉", rating: 4.9 },
      { id: "14", name: "Portalápices Geométrico", price: 29900, image: "🖊️", rating: 4.6 },
    ],
  },
  "16": {
    id: "16",
    name: "Maceta Geométrica",
    description:
      "Maceta con diseño geométrico moderno impresa en 3D. Forma dodecaédrica única que agrega estilo a cualquier espacio. Ideal para suculentas, cactus o plantas pequeñas. Incluye orificio de drenaje y plato base.\n\nFabricada en PLA ecológico. Disponible en varios colores.",
    price: 34900,
    comparePrice: 49900,
    sku: "3DP-MACETA",
    stock: 40,
    rating: 4.5,
    reviewCount: 63,
    sales: 321,
    brand: "PrintMax",
    category: "Impresiones 3D",
    has3D: true,
    modelUrl: "/models/helmet.glb",
    images: ["🪴", "🌿", "💎", "🏠"],
    variants: [
      { id: "v16a", name: "Color", value: "Blanco", stock: 15, price: null },
      { id: "v16b", name: "Color", value: "Negro", stock: 12, price: null },
      { id: "v16c", name: "Color", value: "Terracota", stock: 13, price: null },
    ],
    features: [
      "Diseño dodecaédrico único",
      "PLA ecológico",
      "Orificio de drenaje",
      "Plato base incluido",
      "Ideal para suculentas",
      "Varios colores",
    ],
    reviews: [
      { id: "r10", name: "Camila R.", rating: 5, title: "Hermosa decoración", comment: "Se ve increíble en mi sala. El diseño geométrico es muy elegante.", date: "2024-12-01" },
      { id: "r11", name: "Felipe N.", rating: 4, title: "Muy bonita", comment: "Excelente calidad de impresión. Le doy 4 porque me gustaría más tamaños.", date: "2024-11-15" },
    ],
    relatedProducts: [
      { id: "6", name: "Impresora 3D Pro", price: 1899900, image: "🖨️", rating: 4.8 },
      { id: "13", name: "Figura 3D Dragón", price: 49900, image: "🐉", rating: 4.9 },
      { id: "14", name: "Portalápices Geométrico", price: 29900, image: "🖊️", rating: 4.6 },
    ],
  },
};

const defaultProduct = productsData["1"];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = (params.slug as string) || "";
  const product = productsData[slug] || defaultProduct;
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0].id);
  const [viewMode, setViewMode] = useState<"gallery" | "3d">(product.has3D ? "3d" : "gallery");
  const addItem = useCartStore((s) => s.addItem);
  const { isFavorite, toggle } = useFavorites();
  const fav = slug ? isFavorite(slug) : false;

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleAddToCart = () => {
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

            <div className="relative">
              {discount > 0 && (
                <span className="absolute top-4 left-4 z-10 bg-danger text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
              <button
                onClick={() => toggle(slug || product.id)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
              >
                <Heart className={`w-5 h-5 ${fav ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
              </button>

              {viewMode === "3d" && product.has3D ? (
                <Product3DViewer type="figure" modelUrl={product.modelUrl} />
              ) : (
                <>
                  <div className="card overflow-hidden aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-[120px]">
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
                    {product.images.map((img: string, i: number) => (
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
