import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class SeasonTeamDriverStandingEntry {
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
