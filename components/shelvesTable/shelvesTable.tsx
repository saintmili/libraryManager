"use client";

import React from "react";
import { Table } from "../table/table";
import { useRouter } from "next/navigation";
import { Shelf } from "@prisma/client";

interface ShelvesTableProps {
    shelves: Shelf[];
}

export function ShelvesTable(props: ShelvesTableProps) {
    const { shelves } = props;
    const router = useRouter();

    async function handleView(id: number) {
        router.push("/shelves/" + id);
    }

    async function handleEdit(id: number) {
        router.push("/shelves/" + id + "/edit");
    }

    async function handleDelete(id: number) {
        await fetch(`http://localhost:3002/api/shelves/${id}`, { method: "DELETE" }).then(res => res.json())
        router.refresh()
    }

    return (
        <Table columns={shelves[0] ? Object.keys(shelves[0]) : null} rows={shelves} handleEdit={handleEdit} handleDelete={handleDelete} handleView={handleView} />
    )
}

