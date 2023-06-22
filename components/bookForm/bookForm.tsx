import { useState } from "react";
import { Button } from "../button/button";
import { ShelfAddress } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Data {
    title: string | null;
    author: string | null;
    shelfAddressId: string | null;
    count: string | null;
}

interface Props {
    addresses: ShelfAddress[];
}

export function BookForm(props: Props) {
    const { addresses } = props;
    const [data, setData] = useState<Data>({ title: null, author: null, shelfAddressId: null, count: null })
    const router = useRouter();

    async function handleCreate() {
        let isFormValid = true
        Object.values(data).map(value => { if (!value) isFormValid = false; })
        if (isFormValid) {
            // form is valid, create data
            await fetch("http://localhost:3002/api/books", {
                body: JSON.stringify(data),
                method: "post"
            }).then(data => data.json())
            router.push("/books");
        } else {
            // form is not valid
        }
    }

    return (
        <form className="w-full max-w-lg flex flex-col justify-center">
            <div className="flex flex-wrap">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
                        Title
                    </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="title" onChange={(e) => setData({...data, title: e.currentTarget.value})} />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-author">
                        Author
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-author" type="text" placeholder="author" onChange={(e) => setData({...data, author: e.currentTarget.value})} />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                        Address
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-address" onChange={(e) => setData({ ...data, shelfAddressId: addresses[e.currentTarget.selectedIndex].id.toString() })}>
                            {addresses.map((address) => <option key={address.id}>{address.id}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-count">
                        Count
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-count" type="number" placeholder="999" onChange={(e) => setData({...data, count: e.currentTarget.value})} />
                </div>
            </div>
            <Button onClick={handleCreate}>Create</Button>
        </form>
    )
}
