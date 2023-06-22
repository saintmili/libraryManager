import { BookDetail } from "@/components/bookDetail/bookDetail";
import { Book } from "@prisma/client";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const book: Book = await fetch("http://localhost:3002/api/books/" + id, { cache: "no-store" }).then(res => res.json())

    return (
        <BookDetail book={book} />
    )
}
