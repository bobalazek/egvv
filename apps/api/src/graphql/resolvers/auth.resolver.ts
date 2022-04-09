import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PrismaService } from '../../app/services/prisma.service';
import { AbstractResolver } from './abstract.resolver';
import { AuthService } from '../services/auth.service';
import { LoginArgs } from '../args/auth/login.args';
import { LoginResponse } from '../models/auth/login-response.model';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtUserInterface } from '../auth/interfaces/jwt-user.interface';

@Resolver()
export class AuthResolver extends AbstractResolver {
  private _authService: AuthService;

  constructor(prismaService: PrismaService, authService: AuthService) {
    super(prismaService);

    this._authService = authService;
  }

  @Mutation(() => LoginResponse)
  async login(@Args() args: LoginArgs) {
    const user = await this._authService.validateUser(args.username, args.password);
    if (!user) {
      throw new Error(`User with these credentials does not exist.`);
    }

    return this._authService.login(user);
  }

  @Query(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async profile(@CurrentUser() user: JwtUserInterface) {
    return this._prismaService.user.findFirst({
      where: {
        id: user.sub,
      },
    });
  }
}
