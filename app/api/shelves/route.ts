import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const shelves = await prisma.shelf.findMany();
    return NextResponse.json(shelves)
}

export async function POST(request: Request) {
    const body = await request.json()

    const shelf = await prisma.shelf.create({
        data: {
            title: body.title
        }
    })
    return NextResponse.json(shelf)
}

