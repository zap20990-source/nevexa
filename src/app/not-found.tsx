import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative mx-auto mb-8 w-32 h-32">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl" />
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-primary/5 to-blue-400/5 flex items-center justify-center overflow-hidden border border-primary/10">
            <Image
              src="/images/nex.png"
              alt="NEX"
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
        <h1 className="text-6xl font-extrabold font-heading text-dark dark:text-white mb-4">
          404
        </h1>
        <p className="text-lg font-medium text-dark dark:text-white mb-2">
          NEX no encontró esta página
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          La página que buscas no existe o fue movida a otra dirección.
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
