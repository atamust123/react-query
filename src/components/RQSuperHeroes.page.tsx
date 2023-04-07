import { useQuery } from "react-query";
import axios from "axios"
export const RQSuperHeroes = () => {
    const fetchSuperHeroes = () => { // this only request once, but fetch 2 times
        return axios.get("http://localhost:4000/superheroes")
    }
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery("super-heroes", fetchSuperHeroes, {
        cacheTime: 5000, //after 5 sec of inactive state it will be removed
        staleTime: 10000, // fetch new data to fresh it
        refetchOnMount: true, // do not fetch on mount set it TRUE otherwise it wont be refresh
        refetchOnWindowFocus: true, //if you come back your tab refresh 
        refetchInterval: 12000, // refetch data as banks did for exchange rate 
        refetchIntervalInBackground: true,// refetch data even it works in background,
        onSuccess: (data) => console.log("On success message:", data), // callback func on success
        onError: (err) => console.log("On error message", err), // callback func on error
        select: (data) => {// in order to change data 
            const superHeroNames = data.data.map((hero: { name: string }) => hero.name)
            return superHeroNames;
        }


    })

    console.log("isLoading", isLoading, "isFetching", isFetching)

    if (isLoading) {
        return <h2>Loading...</h2>
    }
    if (isError) {
        return <h2>{(error as any).message}</h2>
    }

    return (
        <>
            <h2>RQ SUPER HEROES</h2>
            <button onClick={() => refetch()}>Fetch heroes</button>
            {/* {data?.data?.map((d: any) => {
                return <div key={d}>{d}</div>
            })} */}
            {
                (data as any)?.map?.((d: any) => <div key={d}>{d}</div>)
            }
        </>

    );
} 