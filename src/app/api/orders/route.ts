import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true, user: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ orders: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order = await prisma.order.create({
      data: {
        subtotal: body.subtotal,
        shipping: body.shipping || 0,
        discount: body.discount || 0,
        total: body.total,
        status: "pending",
        notes: body.notes || "",
        paymentMethod: body.paymentMethod || "whatsapp",
        userId: body.userId || "guest",
        addressId: "default",
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId?.toString() || "unknown",
            quantity: item.quantity || 1,
            price: item.price || 0,
          })),
        },
      },
      include: { items: true },
    });
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ message: "Error al crear pedido" }, { status: 500 });
  }
}
