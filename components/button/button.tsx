"use client"

import { ReactNode } from "react";

interface ButtonProps { 
    color?: "blue" | "gray";
    textColor?: "black" | "white";
    onClick(): void;
    children: ReactNode;
}
export function Button(props: ButtonProps) {
    const {color="blue", textColor="white", onClick, children } = props;

    return (
        <button 
            type="button" 
            className={`bg-${color}-500 hover:bg-${color}-700 text-${textColor} font-bold py-2 px-4 rounded`}
            onClick={() => onClick()}
         >
            {children}
        </button>
    )
}
