import { Book } from "@prisma/client";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const book: Book = await fetch("http://localhost:3002/api/books/" + id, { cache: "no-store" }).then(res => res.json())

    return (
        <>
            <h1>book</h1>
            <p>id: {book.id}</p>
            <p>title: {book.title}</p>
        </>
    )
}
