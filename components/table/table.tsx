"use client"

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
]

export function Table(props: TableProps) {
    const { columns, rows, handleEdit, handleDelete, handleReturn, handleView } = props;

    return (
        <table className="table-auto">
            <thead>
                <tr>
                    {columns.map(col => <th key={col} className="px-4 py-2">{col}</th>)}
                    <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows.map(row => (
                    <tr key={row.id}>
                        {Object.values(row).map((value, index) => <td key={row.id} className="border px-4 py-2">{value && DATE_PARAMS.includes(columns[index]) ? new Date(value).toDateString() : value}</td>)}
                        <td className="border px-4 py-2 flex flex-center gap-3">
                            <ExtraTableActions id={row.id} onDelete={handleDelete} onEdit={handleEdit} onReturn={Object.hasOwn(row, "returnedAt") && !row.returnedAt ? handleReturn : null} onView={handleView} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
