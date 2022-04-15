import buildGraphQLProvider from 'ra-data-graphql-simple';

import client from '@egvv/shared-apollo-client';

export default buildGraphQLProvider({
  client,
});
