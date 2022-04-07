import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import decodeJwt from 'jwt-decode';

import { HTTP_SERVER_GRAPHQL_URL } from '@egvv/shared';

const authProvider = {
  login: async (data: { username: string; password: string }) => {
    const client = new ApolloClient({
      uri: HTTP_SERVER_GRAPHQL_URL,
      cache: new InMemoryCache(),
    });

    const response = await client.query({
      query: gql`
        query doLogin($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            token
          }
        }
      `,
      variables: data,
    });

    if (response.errors?.length || response.error) {
      throw new Error(response.errors?.join(', ') || response.error?.message);
    }

    const { token } = response.data.login;
    const decodedToken = decodeJwt(token);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(decodedToken));

    return Promise.resolve();
  },
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    return Promise.resolve();
  },
  checkAuth: async () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },
  checkError: async (error: any) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      return Promise.reject();
    }

    return Promise.resolve();
  },
  getPermissions: async () => {
    const userRaw = localStorage.getItem('user');
    if (!userRaw) {
      return Promise.reject();
    }

    const user = JSON.parse(userRaw);

    return Promise.resolve(user.roles);
  },
  getIdentity: async () => {
    const userRaw = localStorage.getItem('user');
    if (!userRaw) {
      return { id: '' };
    }

    const user = JSON.parse(userRaw);

    return Promise.resolve({ id: user.sub, fullName: user.username });
  },
};

export default authProvider;
