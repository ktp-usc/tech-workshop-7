import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos);
}

export async function POST(req: Request) {
    const data = await req.json();
    const todo = await prisma.todo.create({ data });
    return NextResponse.json(todo, { status: 201 });
}
