import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <span className="text-8xl block mb-6">🤖</span>
        <h1 className="text-4xl font-extrabold font-heading text-dark dark:text-white mb-3">
          404
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
          NEX no encontró esta página
        </p>
        <p className="text-gray-400 dark:text-gray-500 mb-8">
          La página que buscas no existe o fue movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
          <Link href="/products" className="btn-outline">
            Ver productos
          </Link>
        </div>
      </div>
    </div>
  );
}
