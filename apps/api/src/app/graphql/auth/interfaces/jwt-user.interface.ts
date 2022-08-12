export interface JwtUserInterface extends JwtUserDynamicFieldsInterface {
  iat: number;
  exp: number;
}

export interface JwtUserDynamicFieldsInterface {
  sub: string;
  username: string;
  roles: string[];
}
