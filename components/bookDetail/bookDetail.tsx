'use client'


interface Props {
    book: Book;
}

export function BookDetail(props: Props) {
    const { book } = props;
    const address = "Shelf: " + book.address.shelf.title + ", Row: " + book.address.row + ", Column: " + book.address.column;
    const loans: LoanedBook[] = book.LoanedBook;

    return (
        <>
            <h1>book</h1>
            <p>id: {book.id}</p>
            <p>title: {book.title}</p>
            <p>author: {book.title}</p>
            <p>count: {book.count}</p>
            <p>free to loan: {book.count - loans.filter((loan) => !loan.returnedAt).length}</p>
            <p>address: {address}</p>
        </>
    )
}

