import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const addresses = await prisma.shelfAddress.findMany();
    return NextResponse.json(addresses)
}

export async function POST(request: Request) {
    const body = await request.json()

    const address = await prisma.shelfAddress.create({
        data: {
            row: Number(body.row),
            column: Number(body.column),
            Book: {
                connect: {
                    id: Number(body.bookId)
                }
            },
            shelf: {
                connect: {
                    id: Number(body.shelfId)
                }
            },
            bookId: Number(body.bookId)
        }
    })
    return NextResponse.json(address)
}


