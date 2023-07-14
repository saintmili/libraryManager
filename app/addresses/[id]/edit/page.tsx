import { AddressEdit } from "@/components/addressEdit/addressEdit";
import { Book, Shelf, ShelfAddress } from "@prisma/client";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const address: ShelfAddress = await fetch("http://localhost:3002/api/addresses/" + id, { cache: "no-store" }).then(res => res.json())
    const shelves: Shelf[] = await fetch("http://localhost:3002/api/shelves", { cache: "no-store" }).then(res => res.json())
    const books: Book[] = await fetch("http://localhost:3002/api/books", { cache: "no-store" }).then(res => res.json())

    if (!id) return null;

    return (
        <AddressEdit address={address} shelves={shelves} books={books} />
    )
}

