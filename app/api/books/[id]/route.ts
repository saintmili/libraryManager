import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: {id: string}}) {
    const {id} = params;

    try {
        const book = await prisma.book.findFirst(
            {
                where: {
                    id: Number(id)
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
