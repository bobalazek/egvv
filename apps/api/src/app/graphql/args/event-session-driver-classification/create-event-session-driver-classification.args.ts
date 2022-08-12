import { Field, ArgsType, Int, Float } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionDriverClassificationArgs {
  @Field()
  status: string;

  @Field(() => Int, { nullable: true })
  position?: number;

  @Field(() => Int, { nullable: true })
  timeMilliseconds?: number;

  @Field(() => Int, { nullable: true })
  laps?: number;

  @Field(() => Int, { nullable: true })
  lapsBehind?: number;

  @Field(() => Float, { nullable: true })
  points?: number;

  @Field({ nullable: true })
  note?: string;

  @Field()
  eventSessionDriverId: string;
}
