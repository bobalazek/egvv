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
  startAt: Date;

  @Field({ nullable: true })
  endAt?: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  location?: string;

  @Field(() => Float)
  locationLatitude?: number;

  @Field(() => Float)
  locationLongitude?: number;

  @Field({ nullable: true })
  circuitLayout?: string;

  @Field(() => Int)
  seasonId: number;

  @Field(() => Int)
  circuitId: number;
}
