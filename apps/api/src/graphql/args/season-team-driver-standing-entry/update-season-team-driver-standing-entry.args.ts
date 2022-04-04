import { ArgsType, Field, Float, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateSeasonTeamDriverStandingEntryArgs {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  points: number;

  @Field()
  dateAt: Date;

  @Field({ nullable: true })
  note?: string;

  @Field()
  seasonTeamDriverId: string;

  @Field()
  eventSessionId: string;
}
