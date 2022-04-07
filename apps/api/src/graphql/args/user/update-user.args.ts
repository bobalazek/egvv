import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateUserArgs {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => [String])
  roles: string[];
}
