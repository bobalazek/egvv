import { ApolloClient, ApolloLink, InMemoryCache, from, HttpLink, NormalizedCacheObject } from '@apollo/client';

import { HTTP_SERVER_GRAPHQL_URL } from '../../constants/src';

const authLink = new ApolloLink((operation, forward) => {
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
});
const httpLink = new HttpLink({ uri: HTTP_SERVER_GRAPHQL_URL });

declare global {
  // eslint-disable-next-line no-var
  var apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
}

export const apolloClient =
  global.apolloClient ||
  new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink, httpLink]),
  });
