import { Field, ArgsType, Int, Float } from '@nestjs/graphql';

@ArgsType()
export class CreateEventArgs {
  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  fullName: string;

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
