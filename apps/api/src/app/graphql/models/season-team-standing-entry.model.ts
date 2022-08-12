import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class SeasonTeamStandingEntry {
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
