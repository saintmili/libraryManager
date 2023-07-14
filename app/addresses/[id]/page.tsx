import { ShelfAddress } from "@prisma/client";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const address: ShelfAddress = await fetch("http://localhost:3002/api/addresses/" + id, { cache: "no-store" }).then(res => res.json())

    if (!id) return null;

    return (
        <>
            <h1>Shelf address</h1>
            <p>id: {address.id}</p>
            <p>column: {address.column}</p>
            <p>row: {address.row}</p>
            <p>shelf id: {address.shelfId}</p>
            <p>book id: {address.book?.id}</p>
        </>
    )
}

