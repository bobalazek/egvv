export const DATABASE_URL = <string>process.env.DATABASE_URL;

export const HTTP_SERVER_PORT = parseInt(<string>process.env.API_HTTP_SERVER_PORT || '8080');
export const HTTP_SERVER_GRAPHQL_PATH = '/graphql';
export const HTTP_SERVER_GRAPHQL_URL = 'http://localhost:' + HTTP_SERVER_PORT + HTTP_SERVER_GRAPHQL_PATH;
export const JWT_SECRET = <string>process.env.API_JWT_SECRET;

export const USER_ROLES = ['ROLE_ADMIN'];

export const CLASSIFICATION_STATUSES = [
  { id: 'FINISHED', name: 'Finished' },
  { id: 'DNF', name: 'DNF (Did Not Finish)' },
  { id: 'DNS', name: 'DNS (Did Not Start)' },
  { id: 'DSQ', name: 'DSQ (Disqualified)' },
];
