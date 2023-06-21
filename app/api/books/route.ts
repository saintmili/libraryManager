import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const books = await prisma.book.findMany();
    return NextResponse.json(books)
}

export async function POST(request: Request) {
    const body = await request.json()

    // some validation require before create a new book instance
    const createdBook = await prisma.book.create({
        data: {
            title: body.title,
            author: body.author,
            shelfAddressId: body.shelfAddressId,
            count: body.count
        }
    })
    return NextResponse.json(createdBook)
}
