import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class SeasonTeamStandingsEntryArgs {
  @Field(() => Int)
  eventSessionId: number;
}
