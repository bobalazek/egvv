import { Resolver, Query, Args } from '@nestjs/graphql';

import { AbstractResolver } from './abstract.resolver';
import { AuthService } from '../../auth/services/auth.service';
import { LoginArgs } from '../args/login.args';
import { LoginResponse } from '../models/login-response.model';

@Resolver()
export class AuthResolver extends AbstractResolver {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    super();

    this._authService = authService;
  }

  @Query(() => LoginResponse)
  async login(@Args() args: LoginArgs) {
    const user = await this._authService.validateUser(args.username, args.password);
    if (!user) {
      throw new Error(`User with these credentials does not exist.`);
    }

    return this._authService.login(user);
  }
}
