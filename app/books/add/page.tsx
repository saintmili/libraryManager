"use client"
import { BookForm } from "@/components/bookForm/bookForm";

export default async function Page() {
    return (
        <>
            <h1>Add new book</h1>
            <BookForm />
        </>
    )
}
