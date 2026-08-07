import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Music2,
  Mail,
  MapPin,
  Phone,
  Shield,
  Truck,
  RotateCcw,
  HeadphonesIcon,
} from "lucide-react";

const socialLinks = [
  {
    icon: Facebook,
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
    label: "Instagram",
  },
  {
    icon: Music2,
    href: process.env.NEXT_PUBLIC_TIKTOK_URL || "#",
    label: "TikTok",
  },
  {
    icon: Youtube,
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL || "#",
    label: "YouTube",
  },
];

const footerLinks = {
  empresa: [
    { label: "Sobre NEVEXA", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Trabaja con nosotros", href: "#" },
    { label: "Afiliados", href: "#" },
  ],
  ayuda: [
    { label: "Centro de ayuda", href: "#" },
    { label: "Preguntas frecuentes", href: "#" },
    { label: "Guía de tallas", href: "#" },
    { label: "Contacto", href: "#" },
  ],
  legal: [
    { label: "Términos y condiciones", href: "#" },
    { label: "Política de privacidad", href: "#" },
    { label: "Política de devoluciones", href: "#" },
    { label: "Aviso de cookies", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-dark dark:bg-black text-gray-300">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">NX</span>
              </div>
              <span className="text-xl font-bold text-white">NEVEXA</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6">
              Todo lo que buscas, en un solo lugar.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2.5">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2.5">
              {footerLinks.ayuda.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-white/10">
          {[
            { icon: Truck, text: "Envío gratis +$200k" },
            { icon: RotateCcw, text: "Devolución gratis" },
            { icon: Shield, text: "Compra segura" },
            { icon: HeadphonesIcon, text: "Soporte 24/7" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 text-sm text-gray-400"
            >
              <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-t border-white/10">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NEVEXA. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Colombia
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> hola@nevexa.com
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> +57 300 000 0000
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
