import { ArgsType, Field, Float, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateEventArgs {
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

  @Field()
  url: string;

  @Field({ nullable: true })
  circuitLayout?: string;

  @Field()
  seasonId: string;

  @Field()
  circuitId: string;
}
