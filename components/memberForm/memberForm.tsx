"use client"
import { useState } from "react";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";

interface Data {
    firstName: string | null;
    lastName: string | null;
}

export function MemberForm() {
    const [data, setData] = useState<Data>({ firstName: null, lastName: null })
    const router = useRouter();

    async function handleCreate() {
        let isFormValid = true
        Object.values(data).map(value => { if (!value) isFormValid = false; })
        if (isFormValid) {
            // form is valid, create data
            const res = await fetch("http://localhost:3002/api/members", {
                body: JSON.stringify(data),
                method: "post"
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
            <Button onClick={handleCreate}>Create</Button>
        </form>
    )
}
