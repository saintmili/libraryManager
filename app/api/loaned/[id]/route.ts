import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const loanedBook = await prisma.loanedBook.findFirst(
            {
                where: {
                    id: Number(id)
                }
            }
        )
        return NextResponse.json(loanedBook);
    } catch (error) {
        console.log(error)
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const deletedLoanedBook = await prisma.loanedBook.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json(deletedLoanedBook)
    } catch (error) {
        console.log(error)
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const body = await request.json()
    const {returnedAt} = body
    try {
        const updatedLoanedBook = await prisma.loanedBook.update({
            where: {
                id: Number(id)
            },
            data: {
                returnedAt: returnedAt
            }
        })
        return NextResponse.json(updatedLoanedBook);
    } catch (error) {
        console.log(error);
    }
}
