"use client";

import React from "react";
import { Table } from "../table/table";
import { useRouter } from "next/navigation";
import { ShelfAddress } from "@prisma/client";

interface AddressesTableProps {
    addresses: ShelfAddress[];
}

export function AddressesTable(props: AddressesTableProps) {
    const router = useRouter();

    const addresses = props.addresses.map(address => {
        const { Book, shelf, ...newAddress } = address;
        newAddress.book = address.Book?.title ?? null;
        newAddress.shelf = address.shelf.title;
        newAddress.bookId = address.Book?.id;
        return newAddress;
    });

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
        <Table columns={addresses[0] ? Object.keys(addresses[0]) : null} rows={addresses} handleEdit={handleEdit} handleDelete={handleDelete} handleView={handleView} />
    )
}


