import { NextResponse } from "next/server";
import { createUser } from "@/lib/auth-db";
import { registerSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Datos inválidos", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password, phone } = parsed.data;

    const user = await createUser({ name, email, password, phone });

    return NextResponse.json(
      { message: "Cuenta creada exitosamente", user },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message === "El email ya está registrado") {
      return NextResponse.json(
        { message: "Este email ya está registrado" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Error al crear la cuenta" },
      { status: 500 }
    );
  }
}
