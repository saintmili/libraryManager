import { LoanForm } from "../../components/loanForm/loanForm"
import { LoanedTable } from "../../components/loanedTable/loanedTable"

export default async function Page() {
    const loanedBooks: LoanedBook[] = await fetch("http://localhost:3002/api/loaned", { cache: "no-store" }).then(res => res.json())
    const books: Book[] = await fetch("http://localhost:3002/api/books", { cache: "no-store" }).then(res => res.json())
    const members: Member[] = await fetch("http://localhost:3002/api/members", { cache: "no-store" }).then(res => res.json())

    return (
        <>
            <h1>Loaned books</h1>
            <LoanForm books={books} members={members} />
            <LoanedTable loanedBooks={loanedBooks} />
        </>
    )
}
