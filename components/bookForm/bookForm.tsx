import { useState } from "react";
import { Button } from "../button/button";
import { Shelf, ShelfAddress } from "@prisma/client";

interface Data {
    title: string | null;
    author: string | null;
    shelfAddressId: number | null;
    count: number | null;
}

interface Props {
    shelves: Shelf[];
    addresses: ShelfAddress[];
}

export function BookForm(props: Props) {
    const { shelves, addresses } = props;
    const [data, setData] = useState<Data>({ title: "testing", author: "testing", shelfAddressId: 2, count: 4 })

    async function handleCreate() {
        let isFormValid = true
        Object.values(data).map(value => { if (!value) isFormValid = false; })
        if (isFormValid) {
            // form is valid, create data
            const res = await fetch("http://localhost:3002/api/books", {
                body: JSON.stringify(data),
                method: "post"
            }).then(data => data.json())
            console.log(res)
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
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="title" />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-author">
                        Author
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-author" type="text" placeholder="author" />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-shelf">
                        Shelf
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-shelf" type="text" placeholder="shelf" />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                        Address
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-address" type="text" placeholder="address" />
                </div>
                <div className="w-full md:w-1/3 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-count">
                        Count
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-count" type="number" placeholder="999" />
                </div>
            </div>
            <Button onClick={handleCreate}>Create</Button>
        </form>
    )
}
