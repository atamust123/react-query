import { request } from "graphql-request";
import { useQuery } from "react-query";

// Define a GraphQL query to fetch data from a dummy API
const query = `
query (
    $options: PageQueryOptions
) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {totalCount}
    }
}
`;

// Define a custom hook to fetch data from a GraphQL endpoint
const useFetchData = (query: string) => {
    return useQuery(query, async () => {
        const response = await request(
            "https://graphqlzero.almansi.me/api",
            query
        );
        return response;
    });
};

// Define a component to render the data in a list
const DataList = ({ data }: { data: any[] }) => {
    return (
        <ul>
            {data.map((item) => (
                <li key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                </li>
            ))}
        </ul>
    );
};

// Define the main component that uses the custom hook and the data list component
export const GRQSuperHeroes = () => {
    // Use the custom hook to fetch data from a GraphQL API
    const { data, isLoading, error } = useFetchData(query);

    // Render the loading state, error state or data state
    return (
        <div className="App">
            <h1>React Query GraphQL Example</h1>
            {isLoading && <p>Loading...</p>}
            {(error as any) && <p>Error: {(error as any).message}</p>}
            {data && <DataList data={(data as any).posts.data} />}
        </div>
    );
};
