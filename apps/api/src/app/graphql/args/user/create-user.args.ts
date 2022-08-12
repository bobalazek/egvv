import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateUserArgs {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => [String], { nullable: true })
  roles?: string[];
}
