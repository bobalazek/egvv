import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field(() => Int)
  round: number;

  @Field(() => Int)
  laps: number;

  @Field(() => Float)
  lapDistance: number;

  @Field()
  raceAt: Date;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  circuitLayout?: string;

  @Field()
  seasonId: string;

  @Field()
  circuitId: string;
}
