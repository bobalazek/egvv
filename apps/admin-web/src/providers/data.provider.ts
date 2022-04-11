import { ApolloClient, ApolloLink, InMemoryCache, from, HttpLink } from '@apollo/client';
import buildGraphQLProvider from 'ra-data-graphql-simple';

import { HTTP_SERVER_GRAPHQL_URL } from '@egvv/shared-constants';

const authLink = new ApolloLink((operation, forward) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  operation.setContext(({ headers }: { headers: any }) => ({
    headers: {
      Authorization: 'bearer ' + localStorage.getItem('token'),
      ...headers,
    },
  }));

  return forward(operation);
});
const httpLink = new HttpLink({ uri: HTTP_SERVER_GRAPHQL_URL });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink]),
});

export default buildGraphQLProvider({
  client,
});
