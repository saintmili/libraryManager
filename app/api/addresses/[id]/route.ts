import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

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


