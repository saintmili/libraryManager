import { BooksTable } from "@/components/booksTable/booksTable";
import { Book } from "@prisma/client";
import Link from "next/link";

export default async function Page() {
    const data = await fetch("http://localhost:3002/api/books", { cache: "no-store" })
    const books: Book[] = await data.json()
    return (
        <>
            <h1>Books</h1>
            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="books/add">
                add book
            </Link>
            <BooksTable books={books} />
        </>
    )
}
