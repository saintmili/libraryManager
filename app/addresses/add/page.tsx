import { AddressForm } from "../../../components/addressForm/addressForm";
import { Book, Shelf } from "../../../prisma/client";

export default async function Page() {
    const shelves: Shelf[] = await fetch("http://localhost:3002/api/shelves", { cache: "no-store" }).then(res => res.json())
    const books: Book[] = await fetch("http://localhost:3002/api/books", { cache: "no-store" }).then(res => res.json())
    return (
        <>
            <h1>Add new shelf address</h1>
            <AddressForm shelves={shelves} books={books} />
        </>
    )
}


