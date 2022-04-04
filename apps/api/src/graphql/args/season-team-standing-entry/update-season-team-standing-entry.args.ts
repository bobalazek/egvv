import { ArgsType, Field, Float, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateSeasonTeamStandingEntryArgs {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  points: number;

  @Field()
  dateAt: Date;

  @Field({ nullable: true })
  note?: string;

  @Field()
  seasonTeamId: string;

  @Field()
  eventSessionId: string;
}
