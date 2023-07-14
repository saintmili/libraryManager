import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET(request: Request, {params}: {params: {id: string}}) {
    const {id} = params;

    try {
        const book = await prisma.book.findFirst(
            {
                where: {
                    id: Number(id)
                },
                include: {
                    address: {
                        include: {
                            shelf: true
                        }
                    },
                    LoanedBook: true
                }
            }
        )
        return NextResponse.json(book);
    } catch(error) {
        console.log(error)
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const deletedBook = await prisma.book.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json(deletedBook)
    } catch (error) {
        console.log(error)
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json()
    try {
        const updatedBook = await prisma.book.update({
            where: {
                id: Number(params.id)
            },
            data: {
                author: body.author,
                count: Number(body.count),
                publisher: body.publisher,
                title: body.title,
                volumeNumber: Number(body.volumeNumber),
                shelfAddressId: body.shelfAddressId ? Number(body.shelfAddressId) : undefined
            }
        })
        return NextResponse.json(updatedBook)
    } catch (error) {
        console.log(error)
    }
}
