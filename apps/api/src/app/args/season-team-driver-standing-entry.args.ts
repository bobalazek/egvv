import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class SeasonTeamDriverStandingsEntryArgs {
  @Field(() => Int)
  eventSessionId: number;
}
