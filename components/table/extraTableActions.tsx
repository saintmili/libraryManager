"use client"

import { Button } from "../button/button";

interface ExtraTableActionsProps {
    id: number,
    onDelete?(id: number): void;
    onEdit?(id: number): void;
    onReturn?(id: number): void;
    onView?(id: number): void;
}

export function ExtraTableActions(props: ExtraTableActionsProps) {
    const { id, onDelete, onEdit, onReturn, onView } = props;

    return (
        <>
            {onDelete && <Button onClick={() => onDelete(id)}>Delete</Button>}
            {onEdit && <Button onClick={() => onEdit(id)}>Edit</Button>}
            {onReturn && <Button onClick={() => onReturn(id)}>Return</Button>}
            {onView && <Button onClick={() => onView(id)}>View</Button>}
        </>
    )
}
