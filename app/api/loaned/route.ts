import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const loanedBooks = await prisma.loanedBook.findMany();
    return NextResponse.json(loanedBooks)
}

export async function POST(request: Request) {
    const body = await request.json()
    const bookId = Number(body.bookId)
    const memberId = Number(body.memberId)

    const loanedBook = await prisma.loanedBook.create({
        data: {
            book: {
                connect: { id: bookId }
            },
            member: {
                connect: { id: memberId }
            }
        }
    })
    return NextResponse.json(loanedBook)
}
