export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <span className="text-3xl">🤖</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          NEX está cargando...
        </p>
      </div>
    </div>
  );
}
