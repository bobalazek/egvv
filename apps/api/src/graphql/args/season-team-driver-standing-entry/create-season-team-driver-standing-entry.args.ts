import { Field, ArgsType, Float } from '@nestjs/graphql';

@ArgsType()
export class CreateSeasonTeamDriverStandingEntryArgs {
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
