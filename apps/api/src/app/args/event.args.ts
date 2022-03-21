import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class EventArgs {
  @Field(() => ID)
  id: number;
}
