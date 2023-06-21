import { ShelvesTable } from "@/components/shelvesTable/shelvesTable";
import { Shelf } from "@prisma/client";
import Link from "next/link";

export default async function Page() {
    const data = await fetch("http://localhost:3002/api/shelves", { cache: "no-store" })
    const shelves: Shelf[] = await data.json()

    return (
        <>
            <h1>Shelves</h1>
            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="shelves/add">
                add shelf
            </Link>
            <ShelvesTable shelves={shelves}/>
        </>
    )
}

