import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class SeasonTeamDriverStandingEntry {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  points: number;

  @Field()
  date: Date;

  @Field({ nullable: true })
  note?: string;

  @Field(() => Int)
  seasonTeamDriverId: number;

  @Field(() => Int)
  eventSessionId: number;
}
