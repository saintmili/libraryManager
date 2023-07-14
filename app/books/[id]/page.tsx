import { Book } from "@prisma/client";
import { BookDetail } from "../../../components/bookDetail/bookDetail";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const book: Book = await fetch("http://localhost:3002/api/books/" + id, { cache: "no-store" }).then(res => res.json())

    if(!id) return null;

    return (
        <BookDetail book={book} />
    )
}
