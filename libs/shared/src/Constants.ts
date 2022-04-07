export const DATABASE_URL = <string>process.env.DATABASE_URL;

export const HTTP_SERVER_PORT = parseInt(<string>process.env.API_HTTP_SERVER_PORT || '8080');
export const HTTP_SERVER_GRAPHQL_PATH = '/graphql';
export const JWT_SECRET = <string>process.env.API_JWT_SECRET;

export const USER_ROLES = ['ROLE_ADMIN'];
