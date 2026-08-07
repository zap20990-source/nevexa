import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative mx-auto mb-8 w-28 h-28">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden shadow-lg">
            <Image
              src="/images/nex.png"
              alt="NEX"
              width={112}
              height={112}
              className="w-full h-full object-cover"
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
