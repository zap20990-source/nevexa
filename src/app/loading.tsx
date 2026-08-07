import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative mx-auto mb-6 w-20 h-20">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg animate-bounce relative">
            <Image
              src="/images/nex.png"
              alt="NEX"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-1 w-24 mx-auto rounded-full bg-primary/20 animate-pulse" />
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            NEX está preparando todo...
          </p>
        </div>
      </div>
    </div>
  );
}
