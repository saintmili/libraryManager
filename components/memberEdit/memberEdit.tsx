"use client"
import { useState } from "react";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";
import { Member } from "@prisma/client";

interface Data {
    firstName: string | null;
    lastName: string | null;
}

interface Props {
    member: Member
}

export function MemberEdit(props: Props) {
    const {member} = props
    const [data, setData] = useState<Data>({ firstName: member.firstName, lastName: member.lastName })
    const router = useRouter();

    async function handleEdit() {
        let isFormValid = true
        Object.values(data).map(value => { if (!value) isFormValid = false; })
        if (isFormValid) {
            // form is valid, create data
            const res = await fetch("http://localhost:3002/api/members/" + member.id, {
                body: JSON.stringify(data),
                method: "put"
            }).then(data => data.json())
            router.push("/members");
            console.log(res)
        } else {
            // form is not valid
            alert("form is not valid")
        }
    }

    return (
        <form className="w-full max-w-lg flex flex-col justify-center" >
            <div className="flex flex-wrap ">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-firstname">
                        FirstName
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-firstname" type="text" value={data.firstName ?? ""} onChange={(e) => { e.preventDefault(); e.stopPropagation(); setData({ ...data, firstName: e.currentTarget.value }) }} />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-lastname">
                        LastName
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-lastname" type="text" value={data.lastName ?? ""} onChange={(e) => setData({ ...data, lastName: e.currentTarget.value })} />
                </div>
            </div>
            <Button onClick={handleEdit}>Edit</Button>
        </form>
    )
}
