'use client'

import { LoanedBook, Member } from "@prisma/client";

interface Props {
    member: Member;
}

export function MemberDetail(props: Props) {
    const { member } = props;
    const loans: LoanedBook[] = member.LoanedBook;

    return (
        <>
            <h1>Member</h1>
            <p>id: {member.id}</p>
            <p>first name: {member.firstName}</p>
            <p>last name: {member.lastName}</p>
            <p>member from: {new Date(member.memberFrom).toDateString()}</p>
            <p>loaned books: {loans.filter(loan => !loan.returnedAt).map((loan) => <span key={loan.id}>{loan.book.title}, </span>)}</p>
            <p>all loaned books: {loans.map((loan) => <span key={loan.id}>{loan.book.title}, </span>)}</p>
        </>
    )
}


