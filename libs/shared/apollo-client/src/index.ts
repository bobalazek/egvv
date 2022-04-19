import { ApolloClient, ApolloLink, InMemoryCache, from, HttpLink, NormalizedCacheObject } from '@apollo/client';

import { API_SERVER_GRAPHQL_URL } from '../../constants/src';

declare global {
  // eslint-disable-next-line no-var
  var apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
}

export const apolloClient =
  (typeof global !== 'undefined' && global.apolloClient) ||
  new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      new ApolloLink((operation, forward) => {
        const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          operation.setContext(({ headers }: { headers: any }) => ({
            headers: {
              Authorization: 'bearer ' + token,
              ...headers,
            },
          }));
        }

        return forward(operation);
      }),
      new HttpLink({ uri: API_SERVER_GRAPHQL_URL }),
    ]),
  });

if (typeof global !== 'undefined' && process.env.NODE_ENV !== 'production') global.apolloClient = apolloClient;
