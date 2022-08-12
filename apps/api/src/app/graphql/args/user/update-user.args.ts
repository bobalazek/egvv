import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateUserArgs } from './create-user.args';

@ArgsType()
export class UpdateUserArgs extends CreateUserArgs {
  @Field(() => ID)
  id: string;
}
