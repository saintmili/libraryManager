"use client";

import { Member } from "@prisma/client";
import React from "react";
import { Table } from "../table/table";
import { useRouter } from "next/navigation";

interface MembersTableProps {
    members: Member[];
}

export function MembersTable(props: MembersTableProps) {
    const { members } = props;
    const router = useRouter();

    async function handleView(id: number) {
        router.push("/members/" + id);
    }

    async function handleEdit(id: number) {
        router.push("/members/" + id + "/edit");
    }

    async function handleDelete(id: number) {
        await fetch(`http://localhost:3002/api/members/${id}`, { method: "DELETE" }).then(res => res.json())
        router.refresh()
    }

    return (
        <Table columns={members[0] ? Object.keys(members[0]) : null} rows={members} handleEdit={handleEdit} handleDelete={handleDelete} handleView={handleView} />
    )
}
