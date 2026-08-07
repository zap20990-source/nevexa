import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <Image src="/images/nex.png" alt="NEX" width={100} height={100} className="w-24 h-24 object-contain mx-auto mb-6" />
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
