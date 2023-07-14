import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";

export async function GET() {
    const addresses = await prisma.shelfAddress.findMany({
        include: {
            Book: true,
            shelf: true
        }
    });
    return NextResponse.json(addresses)
}

export async function POST(request: Request) {
    const body = await request.json()

    const address = await prisma.shelfAddress.create({
        data: {
            row: Number(body.row),
            column: Number(body.column),
            shelf: {
                connect: {
                    id: Number(body.shelfId)
                }
            },
            bookId: body.bookId ? Number(body.bookId) : undefined
        }
    })
    return NextResponse.json(address)
}


