import axios from "axios";
import { useEffect, useState } from "react";

export const SuperHeroes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<{ name: string }[] | undefined>();
    const [error, setError] = useState<string>("")

    useEffect(() => {
        axios.get("http://localhost:4000/superheroes")
            .then(res => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            })
    }, [])

    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <>
            <div>SUPER HEROES</div>
            {data?.map((d) => <div key={d.name}>{d?.name}</div>)}
        </>
    );
} 