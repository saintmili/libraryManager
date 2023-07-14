import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";

export async function GET() {
    const members = await prisma.member.findMany();
    return NextResponse.json(members)
}

export async function POST(request: Request) {
    const body = await request.json()

    // some validation require before create a new book instance
    const createdMemeber = await prisma.member.create({
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
        }
    })
    return NextResponse.json(createdMemeber)
}
