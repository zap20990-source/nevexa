import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, brand: true, images: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ products });
  } catch {
    const { productsList } = await import("@/lib/products");
    return NextResponse.json({ products: productsList });
  }
}
