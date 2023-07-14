"use client"
import { BookForm } from "../../../components/bookForm/bookForm";
import { ShelfAddress } from "../../../prisma/client";

export default async function Page() {
    const addresses: ShelfAddress[] = await fetch("http://localhost:3002/api/addresses", { cache: "no-store" }).then(res => res.json())
    return (
        <>
            <h1>Add new book</h1>
            <BookForm addresses={addresses} />
        </>
    )
}
