import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const address = await prisma.shelfAddress.findFirst(
            {
                where: {
                    id: Number(id)
                }
            }
        )
        return NextResponse.json(address);
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const deletedAddress = await prisma.shelfAddress.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json(deletedAddress)
    } catch (error) {
        console.log(error)
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json()
    try {
        const updatedAddress = await prisma.shelfAddress.update({
            where: {
                id: Number(params.id)
            },
            data: {
                row: Number(body.row),
                column: Number(body.column),
                shelfId: body.shelfId ? Number(body.shelfId) : undefined,
                bookId: body.bookId ? Number(body.bookId) : undefined
            }
        })
        return NextResponse.json(updatedAddress)
    } catch (error) {
        console.log(error)
    }
}


