"use client"
import { useState } from "react";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";
import { Book, Shelf, ShelfAddress } from "@prisma/client";

interface Data {
    shelfId: string | null;
    bookId: string | null;
    row: string | null;
    column: string | null;
}

interface Props {
    shelves: Shelf[];
    books: Book[];
    address: ShelfAddress;
}

export function AddressEdit(props: Props) {
    const { shelves, books, address } = props;
    const [data, setData] = useState<Data>({ shelfId: address.shelfId.toString(), bookId: address.bookId?.toString() ?? null, row: address.row.toString(), column: address.column.toString() })
    const router = useRouter();

    async function handleCreate() {
        let isFormValid = true
        Object.entries(data).map(([key, value]) => { if (!value && key !== "bookId") isFormValid = false; })
        if (isFormValid) {
            // form is valid, create data
            const res = await fetch("http://localhost:3002/api/addresses/" + address.id, {
                body: JSON.stringify(data),
                method: "put"
            }).then(data => data.json())
            router.push("/addresses");
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
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-shelf">
                        Shelf
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-shelf" value={shelves[Number(data.shelfId)].title} onChange={(e) => setData({ ...data, shelfId: e.currentTarget.selectedIndex !== 0 ? shelves[e.currentTarget.selectedIndex - 1].id.toString() : null })}>
                            <option>None</option>
                            {shelves.map((shelf) => <option key={shelf.id}>{shelf.title}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap ">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-book">
                        Book
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-book" value={books[Number(data.bookId)].title} onChange={(e) => setData({ ...data, bookId: e.currentTarget.selectedIndex !== 0 ? books[e.currentTarget.selectedIndex - 1].id.toString() : null })}>
                            <option>None</option>
                            {books.map((book) => <option key={book.id}>{book.title}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap ">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-row">
                        Row
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-row" type="text" value={Number(data.row)} onChange={(e) => setData({...data, row: e.currentTarget.value})} />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-column">
                        Column
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-column" type="text" value={Number(data.column)} onChange={(e) => setData({...data, column: e.currentTarget.value})} />
                </div>
            </div>
            <Button onClick={handleCreate}>Create</Button>
        </form>
    )
}


