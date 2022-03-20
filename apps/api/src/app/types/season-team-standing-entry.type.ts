import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class SeasonTeamStandingEntry {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  points: number;

  @Field()
  date: Date;

  @Field({ nullable: true })
  note?: string;

  @Field(() => Int)
  seasonTeamId: number;

  @Field(() => Int)
  eventSessionId: number;
}
