import { BookEdit } from "@/components/bookEdit/bookEdit";
import { Book, ShelfAddress } from "@prisma/client";


export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const book: Book = await fetch("http://localhost:3002/api/books/" + id, { cache: "no-store" }).then(res => res.json())
    const addresses: ShelfAddress[] = await fetch("http://localhost:3002/api/addresses", { cache: "no-store" }).then(res => res.json())

    if(!id) return null;

    return (
        <BookEdit addresses={addresses} book={book} />
    )
}
