import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const book = await prisma.member.findFirst(
            {
                where: {
                    id: Number(id)
                },
                include: {
                    LoanedBook: {
                        include: {
                            book: true
                        }
                    }
                }
            }
        )
        return NextResponse.json(book);
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const deletedMember = await prisma.member.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json(deletedMember)
    } catch (error) {
        console.log(error)
    }
}
