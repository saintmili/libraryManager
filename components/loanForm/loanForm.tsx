"use client"
import { useState } from "react";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";
import { Book, Member } from "@prisma/client";

interface Data {
    bookId: string | null;
    memberId: string | null;
}

interface Props {
    books: Book[];
    members: Member[];
}

export function LoanForm(props: Props) {
    const { books, members } = props;
    const [data, setData] = useState<Data>({ bookId: books[0]?.id.toString() ?? null, memberId: members[0]?.id.toString() ?? null})
    const router = useRouter();

    async function handleCreate() {
        let isFormValid = true
        Object.values(data).map(value => { if (!value) isFormValid = false; })
        if (isFormValid) {
            // form is valid, create data
            await fetch("http://localhost:3002/api/loaned", {
                body: JSON.stringify(data),
                method: "post"
            }).then(data => data.json())
            router.push("/loaned");
        } else {
            // form is not valid
            alert("form is not valid")
        }
    }

    return (
        <form className="w-full max-w-lg justify-center flex flex-col gap-3" >
            <div className="w-full">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-book">
                    Book
                </label>
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-book" onChange={(e) => setData({ ...data, bookId: books[e.currentTarget.selectedIndex].id.toString() })}>
                        {books.map((book) => <option key={book.id}>{book.title}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-member">
                    Member
                </label>
                <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-member" onChange={(e) => setData({ ...data, memberId: members[e.currentTarget.selectedIndex].id.toString() })}>
                        {members.map((member) => <option key={member.id}>{member.firstName}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div>
            <Button onClick={handleCreate}>Create</Button>
        </form>
    )
}

