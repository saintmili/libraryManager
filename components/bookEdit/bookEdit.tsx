"use client"

import { useState } from "react";
import { Button } from "../button/button";
import { Book, ShelfAddress } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Data {
    title: string | null;
    author: string | null;
    shelfAddressId?: string | null;
    count: string | null;
    publisher: string | null;
    volumeNumber: string | null;
}

interface Props {
    addresses: ShelfAddress[];
    book: Book
}

export function BookEdit(props: Props) {
    const { addresses, book } = props;
    const [data, setData] = useState<Data>({ title: book.title, author: book.author, shelfAddressId: book.shelfAddressId?.toString(), count: book.count.toString(), publisher: book.publisher, volumeNumber: book.volumeNumber.toString()})
    const router = useRouter();

    async function handleEdit() {
        let isFormValid = true
        Object.entries(data).map(([key, value]) => { if (!value && key !== "shelfAddressId") isFormValid = false; })
        if (isFormValid) {
            // form is valid, create data
            await fetch("http://localhost:3002/api/books/" + book.id, {
                body: JSON.stringify(data),
                method: "put"
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
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="title" value={data.title?.toString()} onChange={(e) => setData({...data, title: e.currentTarget.value})} />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-author">
                        Author
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-author" type="text" placeholder="author" value={data.author?.toString()} onChange={(e) => setData({...data, author: e.currentTarget.value})} />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-publisher">
                        Publisher
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-publisher" type="text" placeholder="publisher" value={data.publisher?.toString()} onChange={(e) => setData({...data, publisher: e.currentTarget.value})} />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                        Address
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-address" value={data.shelfAddressId?.toString()} onChange={(e) => setData({ ...data, shelfAddressId: e.currentTarget.selectedIndex !== 0 ? addresses[e.currentTarget.selectedIndex - 1].id.toString() : null })}>
                            <option>None</option>
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
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-count" type="number" placeholder="999" value={Number(data.count)} onChange={(e) => setData({...data, count: e.currentTarget.value})} />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-volumeNumber">
                        Volume Number
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-volumeNumber" type="number" placeholder="999" value={Number(data.volumeNumber)} onChange={(e) => setData({...data, volumeNumber: e.currentTarget.value})} />
                </div>
            </div>
            <Button onClick={handleEdit}>Edit</Button>
        </form>
    )
}
