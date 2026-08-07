# NEVEXA

Tienda virtual profesional. Todo lo que buscas, en un solo lugar.

## Stack

- Next.js 16 + TypeScript + Tailwind CSS
- Prisma + PostgreSQL (Neon)
- Three.js (React Three Fiber) para visor 3D
- Zustand + localStorage para estado local
- Framer Motion para animaciones

## Arrancar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build producción
npm run db:seed    # datos iniciales (Neon)
```

## Desplegado en

- **Vercel**: https://nevexa-iota.vercel.app
- **Neon DB**: PostgreSQL serverless

## Lo que tiene

| Feature | Estado |
|---|---|
| Inicio con carrusel, productos, categorías | ✅ |
| Catálogo con 24 productos en 9 categorías | ✅ |
| Páginas individuales por categoría | ✅ |
| Producto detalle con galería, variantes, reseñas | ✅ |
| Carrito con cupones (NEVEXA10, BIENVENIDO) | ✅ |
| Checkout con formulario + resumen | ✅ |
| Buscador con autocompletado y filtros | ✅ |
| Favoritos (localStorage) | ✅ |
| Perfil, direcciones (localStorage) | ✅ |
| Visor 3D interactivo (STL y GLB) | ✅ |
| NEX mascota flotante con chat | ✅ |
| Admin dashboard con productos, pedidos, clientes | ✅ |
| Registro/login con NextAuth | ✅ |
| Pedidos persisten en Neon DB | ✅ |
| Modo oscuro permanente | ✅ |
| SEO: metadata, OG, sitemap, robots.txt, manifest | ✅ |

## Pendientes

- [ ] Reemplazar modelos 3D procedurales por GLB con texturas reales
- [ ] Modelos GLB para cada producto 3D en `/public/models/`
- [ ] Integración de pagos real (Stripe, Wompi, MercadoPago, PayU)
- [ ] Google Analytics
- [ ] Pasarela de WhatsApp funcional
- [ ] Admin: editar productos conectado a DB
- [ ] Email de confirmación de pedido
- [ ] Notificaciones push (PWA)
- [ ] Migración de cuenta admin y perfil a DB real (actualmente usa localStorage)

## Cómo agregar modelos 3D

1. Poner el archivo `.glb` en `public/models/`
2. En `src/lib/products.ts`, buscar el producto y cambiar `modelUrl`:
   ```ts
   modelUrl: "/models/tu-modelo.glb"
   ```

## Usuarios demo (si se usa login)

`admin@nevexa.com` / `nevexa123`
`cliente@nevexa.com` / `nevexa123`
