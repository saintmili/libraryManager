"use client"
import { useState } from "react";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";

interface Data {
    title: string | null;
}

export function ShelfForm() {
    const [data, setData] = useState<Data>({ title: null })
    const router = useRouter();

    async function handleCreate() {
        let isFormValid = true
        Object.values(data).map(value => { if (!value) isFormValid = false; })
        if (isFormValid) {
            // form is valid, create data
            const res = await fetch("http://localhost:3002/api/shelves", {
                body: JSON.stringify(data),
                method: "post"
            }).then(data => data.json())
            router.push("/shelves");
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
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
                        Title
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" value={data.title ?? ""} onChange={(e) => { e.preventDefault(); e.stopPropagation(); setData({ ...data, title: e.currentTarget.value }) }} />
                </div>
            </div>
            <Button onClick={handleCreate}>Create</Button>
        </form>
    )
}

