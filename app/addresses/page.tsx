import { AddressesTable } from "@/components/addressesTable/addressesTable";
import { ShelfAddress } from "@prisma/client";
import Link from "next/link";

export default async function Page() {
    const data = await fetch("http://localhost:3002/api/addresses", { cache: "no-store" })
    const addresses: ShelfAddress[] = await data.json()

    return (
        <>
            <h1>Addresses</h1>
            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="addresses/add">
                add address
            </Link>
            <AddressesTable addresses={addresses}/>
        </>
    )
}


