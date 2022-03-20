import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class EventSessionTeamDriverArgs {
  @Field(() => Int)
  eventSessionId: number;
}
