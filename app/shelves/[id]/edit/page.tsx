import { ShelfEdit } from "@/components/shelfEdit/shelfEdit";
import { Shelf } from "@prisma/client";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const shelf: Shelf = await fetch("http://localhost:3002/api/shelves/" + id, { cache: "no-store" }).then(res => res.json())

    if(!id) return null;

    return (
        <ShelfEdit shelf={shelf} />
    )
}

