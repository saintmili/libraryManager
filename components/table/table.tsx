"use client"

import Link from "next/link";
import { ExtraTableActions } from "./extraTableActions";

interface TableProps {
    columns: string[];
    rows: { id: number; returnedAt: Date | null }[];
    handleEdit?(id: number): void;
    handleDelete?(id: number): void;
    handleReturn?(id: number): void;
    handleView?(id: number): void;
}

const DATE_PARAMS = [
    "returnedAt",
    "loanedAt",
    "memberFrom"
];

const Link_PARAMS = {
    book: {
        href: "books",
        id: "bookId"
    },
    member: {
        href: "members",
        id: "memberId"
    },
    shelf: {
        href: "shelves",
        id: "shelfId"
    }
}

const EXCLUDE_PARAMS = [
    "bookId",
    "memberId",
    "shelfId"
];

export function Table(props: TableProps) {
    const { columns, rows, handleEdit, handleDelete, handleReturn, handleView } = props;

    return (
        <table className="table-auto">
            <thead>
                <tr>
                    {columns.map(col => !EXCLUDE_PARAMS.includes(col) ? <th key={col} className="px-4 py-2">{col}</th> : null)}
                    <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows.map(row => {
                    return (
                        <tr key={row.id}>
                            {Object.values(row).map((value, index) => {
                                if (EXCLUDE_PARAMS.includes(columns[index])) return;
                                const content = value && DATE_PARAMS.includes(columns[index]) ? new Date(value).toDateString() : value
                                return (
                                    <td key={index + row.id} className="border px-4 py-2">{Link_PARAMS[columns[index]] ? <Link href={Link_PARAMS[columns[index]].href + "/" + row[Link_PARAMS[columns[index]].id].toString()} >{content}</Link> : content}</td>
                                )
                            })}
                            <td className="border px-4 py-2 flex flex-center gap-3">
                                <ExtraTableActions id={row.id} onDelete={handleDelete} onEdit={handleEdit} onReturn={Object.hasOwn(row, "returnedAt") && !row.returnedAt ? handleReturn : null} onView={handleView} />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
