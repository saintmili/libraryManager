import { MemberEdit } from "@/components/memberEdit/memberEdit";
import { Member } from "@prisma/client";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const member: Member = await fetch("http://localhost:3002/api/members/" + id, { cache: "no-store" }).then(res => res.json())
    console.log(member)

    if(!id) return null;

    return (
        <MemberEdit member={member} />
    )
}
