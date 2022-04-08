import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { AbstractResolver } from './abstract.resolver';
import { PrismaService } from '../../app/services/prisma.service';
import { AuthService } from '../services/auth.service';
import { LoginArgs } from '../args/auth/login.args';
import { LoginResponse } from '../models/auth/login-response.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtUserInterface } from '../auth/interfaces/jwt-user.interface';

@Resolver()
export class AuthResolver extends AbstractResolver {
  private _prismaService: PrismaService;
  private _authService: AuthService;

  constructor(prismaService: PrismaService, authService: AuthService) {
    super();

    this._prismaService = prismaService;
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
