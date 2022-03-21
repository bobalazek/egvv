import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class TeamArgs {
  @Field(() => ID)
  id: number;
}
