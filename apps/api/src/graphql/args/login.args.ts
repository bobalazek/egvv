import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginArgs {
  @Field()
  username: string;

  @Field()
  password: string;
}
