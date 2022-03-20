import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class SeasonTeamPointStandingsEntryArgs {
  @Field(() => Int)
  eventSessionId: number;
}
