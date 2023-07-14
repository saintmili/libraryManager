import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";

export async function GET() {
    const books = await prisma.book.findMany({
        include: {
            address: {
                include: {
                    shelf: true
                }
            }
        }
    });
    return NextResponse.json(books)
}

export async function POST(request: Request) {
    const body = await request.json()

    // some validation require before create a new book instance
    const createdBook = await prisma.book.create({
        data: {
            title: body.title,
            author: body.author,
            shelfAddressId: body.shelfAddressId ? Number(body.shelfAddressId) : undefined,
            count: Number(body.count),
            publisher: body.publisher,
            volumeNumber: Number(body.volumeNumber),
        }
    })
    return NextResponse.json(createdBook)
}
