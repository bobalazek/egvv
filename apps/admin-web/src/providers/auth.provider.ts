import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import decodeJwt from 'jwt-decode';

import { HTTP_SERVER_GRAPHQL_URL } from '@egvv/shared';

const authProvider = {
  login: async (data: { username: string; password: string }) => {
    const client = new ApolloClient({
      uri: HTTP_SERVER_GRAPHQL_URL,
      cache: new InMemoryCache(),
    });

    const response = await client.mutate({
      mutation: gql`
        mutation doLogin($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            token
          }
        }
      `,
      variables: data,
    });

    if (response.errors?.length) {
      throw new Error(response.errors?.join(', '));
    }

    const { token } = response.data.login;
    const decodedToken = decodeJwt(token);

    localStorage.setItem('token', token);
    localStorage.setItem('tokenData', JSON.stringify(decodedToken));

    return Promise.resolve();
  },
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenData');

    return Promise.resolve();
  },
  checkAuth: async () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkError: async (error: any) => {
    if (error.status === 401 || error.status === 403 || error.message === 'Unauthorized') {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenData');

      return Promise.reject();
    }

    return Promise.resolve();
  },
  getPermissions: async () => {
    const tokenData = localStorage.getItem('tokenData');
    if (!tokenData) {
      return Promise.reject();
    }

    const tokenDataParsed = JSON.parse(tokenData);

    return tokenDataParsed.roles;
  },
  getIdentity: async () => {
    const tokenData = localStorage.getItem('tokenData');
    if (!tokenData) {
      return { id: '', fullName: '' };
    }

    const tokenDataParsed = JSON.parse(tokenData);

    return { id: tokenDataParsed.sub, fullName: tokenDataParsed.username };
  },
};

export default authProvider;
