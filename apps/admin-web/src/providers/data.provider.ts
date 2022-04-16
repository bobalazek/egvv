import buildGraphQLProvider from 'ra-data-graphql-simple';

import { apolloClient } from '@egvv/shared-apollo-client';

export default buildGraphQLProvider({
  client: apolloClient,
});
