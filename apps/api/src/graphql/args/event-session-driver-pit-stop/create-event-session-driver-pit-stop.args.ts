import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionDriverPitStopArgs {
  @Field(() => Int)
  lap: number;

  @Field(() => Int, { nullable: true })
  stopTimeMilliseconds?: number;

  @Field(() => Int, { nullable: true })
  timeMilliseconds?: number;

  @Field({ nullable: true })
  tyres?: string;

  @Field()
  eventSessionDriverId: string;
}
