import Link from "next/link";
import { MembersTable } from "../../components/membersTable/membersTable";

export default async function Members() {
    const data = await fetch("http://localhost:3002/api/members", { cache: "no-store" })
    const members: Member[] = await data.json()

    return (
        <>
            <h1>Members</h1>
            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="members/add">
                add member
            </Link>
            <MembersTable members={members} />
        </>
    )
}

