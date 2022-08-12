import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class SeasonDriverStandingEntry {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  points: number;

  @Field()
  dateAt: Date;

  @Field({ nullable: true })
  note?: string;

  @Field()
  seasonDriverId: string;

  @Field()
  eventSessionId: string;
}
