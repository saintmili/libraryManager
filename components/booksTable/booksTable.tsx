"use client"

import { Book } from "@prisma/client";
import { Table } from "../table/table";
import { useRouter } from "next/navigation";

interface BooksTableProps {
    books: Book[];
}

export function BooksTable(props: BooksTableProps) {
    const router = useRouter();

    const books = props.books.map(book => {
        const { address, ...newAddress } = book;
        newAddress.shelfAddress = book.address ? "Shelf: " + book.address.shelf.title + ", Row: " + book.address.row + ", Column: " + book.address.column : null;
        return newAddress;
    });

    async function handleDelete(id: number) {
        await fetch(`http://localhost:3002/api/books/${id}`, { method: "DELETE" }).then(res => res.json())
        router.refresh();
    }

    async function handleEdit(id: number) {
        router.push("/books/" + id + "/edit")
    }

    async function handleView(id: number) {
        router.push("/books/" + id)
    }

    return (
        <Table columns={books[0] ? Object.keys(books[0]) : null} rows={books} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
    )
}
