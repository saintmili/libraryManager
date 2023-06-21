"use client"

import { Book } from "@prisma/client";
import { Table } from "../table/table";
import { useRouter } from "next/navigation";

interface BooksTableProps {
    books: Book[];
}

export function BooksTable(props: BooksTableProps) {
    const { books } = props;
    const router = useRouter();

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
        <Table columns={Object.keys(books[0])} rows={books} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView} />
    )
}
