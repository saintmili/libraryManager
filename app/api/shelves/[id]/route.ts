import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const shelf = await prisma.shelf.findFirst(
            {
                where: {
                    id: Number(id)
                }
            }
        )
        return NextResponse.json(shelf);
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const deletedShelf = await prisma.shelf.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json(deletedShelf)
    } catch (error) {
        console.log(error)
    }
}

