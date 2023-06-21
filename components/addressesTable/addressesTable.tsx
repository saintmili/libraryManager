"use client";

import React from "react";
import { Table } from "../table/table";
import { useRouter } from "next/navigation";
import { ShelfAddress } from "@prisma/client";

interface AddressesTableProps {
    addresses: ShelfAddress[];
}

export function AddressesTable(props: AddressesTableProps) {
    const { addresses } = props;
    const router = useRouter();

    async function handleView(id: number) {
        router.push("/addresses/" + id);
    }

    async function handleEdit(id: number) {
        router.push("/addresses/" + id + "/edit");
    }

    async function handleDelete(id: number) {
        await fetch(`http://localhost:3002/api/addresses/${id}`, { method: "DELETE" }).then(res => res.json())
        router.refresh()
    }

    return (
        <Table columns={Object.keys(addresses[0])} rows={addresses} handleEdit={handleEdit} handleDelete={handleDelete} handleView={handleView} />
    )
}


