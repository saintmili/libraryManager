"use client"

import { LoanedBook } from "@prisma/client";
import { Table } from "../table/table";
import { useRouter } from "next/navigation";

interface LoanedTableProps {
    loanedBooks: LoanedBook[];
}

export function LoanedTable(props: LoanedTableProps) {
    const { loanedBooks } = props;
    const router = useRouter();

    async function handleReturn(id: number) {
        await fetch(`http://localhost:3002/api/loaned/${id}`, { method: "PUT", body: JSON.stringify({returnedAt: new Date()}) }).then(res => res.json())
        router.refresh();
        // router.push("/loaned/" + id)
    }

    return (
        <Table columns={Object.keys(loanedBooks[0])} rows={loanedBooks} handleReturn={handleReturn} />
    )
}

