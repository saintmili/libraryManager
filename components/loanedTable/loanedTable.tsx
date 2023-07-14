"use client"

import { LoanedBook } from "@prisma/client";
import { Table } from "../table/table";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoanedTableProps {
    loanedBooks: LoanedBook[];
}

export function LoanedTable(props: LoanedTableProps) {
    const router = useRouter();
    const [showAll, setShowAll] = useState(true);
    const loanedBooks = props.loanedBooks.map(loanedBook => {
        const { book, member, ...newBook } = loanedBook;
        newBook.book = loanedBook.book.title;
        newBook.member = loanedBook.member.firstName + " " + loanedBook.member.lastName;
        return newBook;
    });

    async function handleReturn(id: number) {
        await fetch(`http://localhost:3002/api/loaned/${id}`, { method: "PUT", body: JSON.stringify({ returnedAt: new Date() }) }).then(res => res.json())
        router.refresh();
        // router.push("/loaned/" + id)
    }

    return (
        <>
            <div className="md:flex md:items-center mb-6">
                <label className="block text-gray-500 font-bold">
                    <input className="mr-2 leading-tight" type="checkbox" checked={!showAll} onChange={(e) => setShowAll(!e.currentTarget.checked)} />
                    <span className="text-sm">
                        show not returned only
                    </span>
                </label>
            </div>
            <Table columns={loanedBooks[0] ? Object.keys(loanedBooks[0]) : null} rows={showAll ? loanedBooks : loanedBooks.filter(book => !book.returnedAt)} handleReturn={handleReturn} />
        </>
    )
}

