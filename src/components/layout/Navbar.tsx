"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  Package,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useCartStore } from "@/store";
import { NAV_LINKS } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-gray-700/30">
        <div className="container-page">
          <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logo.png"
              alt="NEVEXA"
              width={160}
              height={40}
              className="h-10 w-auto group-hover:scale-105 transition-transform"
              priority
            />
          </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="btn-ghost rounded-full p-2"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>

              <ThemeToggle />

              <Link
                href="/account/favorites"
                className="btn-ghost rounded-full p-2 hidden sm:flex"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <Link
                href="/cart"
                className="btn-ghost rounded-full p-2 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>

              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="btn-ghost rounded-full p-2 flex items-center gap-1"
                  >
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Avatar"
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <ChevronDown className="w-3 h-3 hidden sm:block" />
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white dark:bg-dark-card shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm font-medium text-dark dark:text-white truncate">
                            {session.user?.name || "Usuario"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {session.user?.email}
                          </p>
                        </div>
                        <Link
                          href="/account/orders"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Package className="w-4 h-4" /> Mis pedidos
                        </Link>
                        <Link
                          href="/account/profile"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" /> Mi perfil
                        </Link>
                        {(session.user as any)?.role === "admin" && (
                          <Link
                            href="/admin"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Settings className="w-4 h-4" /> Admin
                          </Link>
                        )}
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" /> Cerrar sesión
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link href="/login" className="btn-primary text-xs px-4 py-2">
                  Iniciar sesión
                </Link>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="btn-ghost rounded-full p-2 lg:hidden"
                aria-label="Menú"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-gray-200/50 dark:border-gray-700/30 bg-white dark:bg-dark animate-in slide-in-from-top-2 duration-200">
            <div className="container-page py-3">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field flex-1"
                  autoFocus
                />
                <button type="submit" className="btn-primary">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-dark-card shadow-2xl p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-bold font-heading">Menú</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="btn-ghost rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-4 border-gray-200 dark:border-gray-700" />
              {session ? (
                <>
                  <Link
                    href="/account/orders"
                    className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5 rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    Mis pedidos
                  </Link>
                  <Link
                    href="/account/profile"
                    className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5 rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    Mi perfil
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg text-left"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="btn-primary w-full text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Iniciar sesión
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
