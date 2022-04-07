import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { IdArgs } from '../args/id.args';
import { AllUsersArgs } from '../args/user/all-users.args';
import { User } from '../models/user.model';
import { ListMetadata } from '../models/list-metadata.model';
import { AbstractResolver } from './abstract.resolver';
import { CreateUserArgs } from '../args/user/create-user.args';
import { UpdateUserArgs } from '../args/user/update-user.args';

// TODO: this resolver should only be acessible for admins!
@Resolver(User)
export class UserResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => User)
  async User(@Args() args: IdArgs) {
    return this._prismaService.user.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [User])
  async allUsers(@Args() args: AllUsersArgs) {
    return this._prismaService.user.findMany(this.getAllArgs(args, false, ['username', 'email']));
  }

  @Query(() => ListMetadata)
  async _allUsersMeta(@Args() args: AllUsersArgs): Promise<ListMetadata> {
    const count = await this._prismaService.user.count(this.getAllArgs(args, true, ['username', 'email']));
    return {
      count,
    };
  }

  @Mutation(() => User)
  async createUser(@Args() args: CreateUserArgs) {
    return this._prismaService.user.create({
      data: args,
    });
  }

  @Mutation(() => User)
  async updateUser(@Args() args: UpdateUserArgs) {
    return this._prismaService.user.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => User)
  async deleteUser(@Args() args: IdArgs) {
    return this._prismaService.user.delete({
      where: {
        id: args.id,
      },
    });
  }
}
