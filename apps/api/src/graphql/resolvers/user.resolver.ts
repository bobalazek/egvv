import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AbstractResolver } from './abstract.resolver';
import { IdArgs } from '../args/id.args';
import { User } from '../models/user.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AllUsersArgs } from '../args/user/all-users.args';
import { CreateUserArgs } from '../args/user/create-user.args';
import { UpdateUserArgs } from '../args/user/update-user.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtUserInterface } from '../auth/interfaces/jwt-user.interface';

@Resolver(User)
export class UserResolver extends AbstractResolver {
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async User(@Args() args: IdArgs) {
    return this._prismaService.user.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async allUsers(@Args() args: AllUsersArgs) {
    return this._prismaService.user.findMany(await this.getAllArgs(args, false, ['username', 'email']));
  }

  @Query(() => ListMetadata)
  @UseGuards(GqlAuthGuard)
  async _allUsersMeta(@Args() args: AllUsersArgs): Promise<ListMetadata> {
    const count = await this._prismaService.user.count(await this.getAllArgs(args, true, ['username', 'email']));
    return {
      count,
    };
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async createUser(@Args() args: CreateUserArgs) {
    return this._prismaService.user.create({
      data: args,
    });
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(@Args() args: UpdateUserArgs) {
    return this._prismaService.user.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args() args: IdArgs, @CurrentUser() user: JwtUserInterface) {
    if (user.sub === args.id) {
      throw new Error(`You can not delete yourself.`);
    }

    return this._prismaService.user.delete({
      where: {
        id: args.id,
      },
    });
  }
}
