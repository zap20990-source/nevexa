"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { productsList, categoryInfo } from "@/lib/products";

const slides = [
  {
    title: "Bienvenido al futuro de las compras",
    subtitle: "Tecnología, innovación y los mejores precios en un solo lugar.",
    cta: "Comprar ahora",
    ctaLink: "/products",
    gradient: "from-primary via-blue-700 to-indigo-900",
    image: "🎯",
  },
  {
    title: "Ofertas increíbles",
    subtitle: "Hasta 50% de descuento en productos seleccionados.",
    cta: "Ver ofertas",
    ctaLink: "/products?discount=true",
    gradient: "from-purple-600 via-pink-600 to-rose-700",
    image: "🏷️",
  },
  {
    title: "Nueva: Impresiones 3D",
    subtitle: "Figuras, decoración y piezas personalizadas impresas en 3D. ¡Vista interactiva en cada producto!",
    cta: "Explorar colección 3D",
    ctaLink: "/categories/impresiones-3d",
    gradient: "from-violet-600 via-indigo-600 to-blue-800",
    image: "🖨️",
  },
  {
    title: "Nuevos productos",
    subtitle: "Descubre lo último en tecnología, gaming y más.",
    cta: "Explorar",
    ctaLink: "/products",
    gradient: "from-emerald-600 via-teal-600 to-cyan-700",
    image: "🚀",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const featuredProducts = productsList.slice(0, 8).map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    comparePrice: p.comparePrice,
    image: p.images[0],
    rating: p.rating,
    sales: p.sales,
  }));

  const categories = Object.entries(categoryInfo).map(([slug, info]) => ({
    name: info.name,
    slug,
    icon: info.icon,
  }));

  const reviews = [
    { name: "Carlos M.", text: "Excelente servicio y productos de calidad. NEX me ayudó a encontrar justo lo que necesitaba.", rating: 5 },
    { name: "Ana G.", text: "Compré un teclado gaming y llegó en 2 días. ¡Increíble! NEVEXA es mi tienda favorita.", rating: 5 },
    { name: "Laura R.", text: "La experiencia de compra es muy fácil y rápida. Los precios son los mejores del mercado.", rating: 5 },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient}`}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        {currentSlide === 2 && (
          <>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px),
                  linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px',
                backgroundPosition: '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
                transform: 'perspective(500px) rotateX(60deg)',
                transformOrigin: 'center bottom',
                maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 80%)',
              }} />
            </div>
          </>
        )}

        <div className="container-page relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-3 mb-4 bg-white/10 backdrop-blur-sm rounded-full pl-1.5 pr-4 py-1.5 border border-white/10">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image src="/images/nex.png" alt="NEX" width={32} height={32} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white/90 text-sm font-medium">
                      NEX te da la bienvenida
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-heading text-white leading-tight mb-6">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
                    {slides[currentSlide].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap gap-3 mb-10">
                <button
                  onClick={() => router.push(slides[currentSlide].ctaLink || "/products")}
                  className="btn-primary bg-white text-primary hover:bg-white/90 hover:text-primary-dark px-8 py-4 text-base group"
                >
                  {slides[currentSlide].cta}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => router.push(slides[currentSlide].ctaLink || "/products")}
                  className="btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 text-base"
                >
                  Explorar <Sparkles className="w-5 h-5 ml-2" />
                </button>
              </div>

              <form onSubmit={handleSearch} className="max-w-lg flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="¿Qué estás buscando?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary bg-white text-primary hover:bg-white/90 px-6"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>

              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentSlide
                          ? "w-8 bg-white"
                          : "w-1.5 bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  transition={{ duration: 0.5 }}
                  className="text-[180px] select-none"
                >
                  {slides[currentSlide].image}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-dark to-transparent" />
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-dark dark:text-white">
                Productos destacados
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Lo más vendido esta semana
              </p>
            </div>
            <a
              href="/products"
              className="hidden sm:flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, i) => (
              <motion.a
                key={product.id}
                href={`/products/${product.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="card group cursor-pointer overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-6xl relative">
                  {product.comparePrice && (
                    <span className="absolute top-3 left-3 bg-danger text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                    </span>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {product.image}
                  </motion.div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-dark dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {product.rating}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({product.sales.toLocaleString()})
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
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <a href="/products" className="btn-primary">
              Ver todos los productos <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-dark-secondary">
        <div className="container-page">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-center text-dark dark:text-white mb-2">
            Categorías
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-10">
            Encuentra lo que necesitas por categoría
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <motion.a
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="card p-6 text-center group cursor-pointer hover:border-primary/30"
              >
                <span className="text-4xl mb-3 block">{cat.icon}</span>
                <span className="text-sm font-medium text-dark dark:text-white group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* NEX Banner */}
      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-blue-600 to-indigo-800 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white/20 flex items-center justify-center text-6xl flex-shrink-0">
                🤖
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-white mb-3">
                  ¡NEX te ayuda a encontrar lo mejor!
                </h3>
                <p className="text-white/80 mb-6 max-w-xl">
                  Pregúntame lo que necesites. Estoy aquí para ayudarte a
                  encontrar el producto perfecto al mejor precio.
                </p>
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
                >
                  Explorar productos <Sparkles className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute right-20 top-0 w-24 h-24 bg-pink-400/20 rounded-full blur-2xl" />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-dark-secondary">
        <div className="container-page">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-center text-dark dark:text-white mb-2">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-10">
            Miles de clientes confían en NEVEXA
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-sm font-semibold text-dark dark:text-white">
                  {review.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🚚", title: "Envío gratis", desc: "+$200k" },
              { icon: "🔄", title: "Devolución gratis", desc: "30 días" },
              { icon: "🔒", title: "Compra segura", desc: "SSL 256-bit" },
              { icon: "💬", title: "Soporte 24/7", desc: "Siempre disponible" },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="text-3xl block mb-3">{benefit.icon}</span>
                <h3 className="font-semibold text-dark dark:text-white mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-dark to-dark-secondary">
        <div className="container-page">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-3">
              Mantente al día
            </h2>
            <p className="text-gray-400 mb-6">
              Recibe ofertas exclusivas, novedades y descuentos directamente en
              tu correo.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="input-field flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Suscribirme
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3">
              Sin spam. Te puedes dar de baja cuando quieras.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
