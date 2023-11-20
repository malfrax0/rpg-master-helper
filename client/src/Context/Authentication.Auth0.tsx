import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, from, split } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { getMainDefinition } from "@apollo/client/utilities"
import { useAuth0 } from "@auth0/auth0-react"
import { createClient } from "graphql-ws"
import { ReactNode, useMemo } from "react"

type AuthenticationProviderProps = {
    children: ReactNode
}

const AuthenticationProvider = (props: AuthenticationProviderProps) => {
    const { getAccessTokenSilently } = useAuth0();
    
    const httpLink = createHttpLink({
        uri: 'http://localhost:4000/api'
    });
    
    const wsLink = new GraphQLWsLink(createClient({
        url: 'ws://localhost:4000/api/subscriptions'
    }));
    
    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
    
            return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink
    )

    const authLink = setContext(async (_, { headers }) => {
        const token = await getAccessTokenSilently();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ""
            }
        }
    });
    
    const client = new ApolloClient({
        link: authLink.concat(splitLink),
        cache: new InMemoryCache()
    });

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>
} 

export default AuthenticationProvider;