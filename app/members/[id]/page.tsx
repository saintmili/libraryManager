import { Member } from "@prisma/client";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const member: Member = await fetch("http://localhost:3002/api/members/" + id, { cache: "no-store" }).then(res => res.json())

    return (
        <>
            <h1>member</h1>
            <p>id: {member.id}</p>
            <p>First name: {member.firstName}</p>
            <p>Last name: {member.lastName}</p>
        </>
    )
}
