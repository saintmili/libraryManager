import { useEffect, useState } from "react";

interface FetcApiProps {
    address: string;
    method: "GET" | "POST" | "DELETE" | "PUT";
    body?: null;
}

type FetchStatus = "succeed" | "failed" | "pending"

export function useFetch(props: FetcApiProps) {
    const { address, method, body } = props;
    const [status, setStatus] = useState<FetchStatus>();
    const [data, setData] = useState();

    useEffect(() => {
        setStatus("pending");
        fetch("http://localhost:3002" + address, {
            method: method,
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((data) => {
            setStatus("succeed");
            setData(data);
        })
        .catch((error) => {
            setStatus("failed");
            setData(error);
        })
    }, [])

    return ({status, data})
}
