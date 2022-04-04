import { Field, ArgsType, Float } from '@nestjs/graphql';

@ArgsType()
export class CreateSeasonTeamStandingEntryArgs {
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
