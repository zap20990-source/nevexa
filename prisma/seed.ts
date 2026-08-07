import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@nevexa.com" },
    update: {},
    create: {
      name: "Admin NEVEXA",
      email: "admin@nevexa.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Admin user created:", admin.email);

  const categories = [
    { name: "Tecnología", slug: "tecnologia", description: "Computadores, tablets y accesorios" },
    { name: "Gaming", slug: "gaming", description: "Consolas, periféricos y sillas gamer" },
    { name: "Hogar", slug: "hogar", description: "Decoración, muebles e iluminación" },
    { name: "Oficina", slug: "oficina", description: "Escritorios, sillas y papelería" },
    { name: "Accesorios", slug: "accesorios", description: "Relojes, bolsos y más" },
    { name: "Mascotas", slug: "mascotas", description: "Alimentos y juguetes" },
    { name: "Ropa", slug: "ropa", description: "Camisetas, chaquetas y zapatos" },
    { name: "Herramientas", slug: "herramientas", description: "Eléctricas y manuales" },
    { name: "Impresiones 3D", slug: "impresiones-3d", description: "Figuras personalizadas" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log("Categories created:", categories.length);

  const brands = [
    { name: "AudioTech", slug: "audiotech" },
    { name: "KeyPro", slug: "keypro" },
    { name: "GameMax", slug: "gamemax" },
    { name: "ViewPro", slug: "viewpro" },
    { name: "ErgoPlus", slug: "ergoplus" },
    { name: "PrintMax", slug: "printmax" },
    { name: "TechLink", slug: "techlink" },
    { name: "SafeBag", slug: "safebag" },
  ];

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: brand,
    });
  }

  console.log("Brands created:", brands.length);

  const coupons = [
    {
      code: "NEVEXA10",
      type: "percentage",
      value: 10,
      maxUses: 100,
      isActive: true,
    },
    {
      code: "BIENVENIDO",
      type: "fixed",
      value: 20000,
      minAmount: 100000,
      isActive: true,
    },
  ];

  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: {},
      create: coupon,
    });
  }

  console.log("Coupons created:", coupons.length);
  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
