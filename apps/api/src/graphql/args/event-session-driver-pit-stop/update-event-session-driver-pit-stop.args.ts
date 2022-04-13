import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateEventSessionDriverDriverPitStopArgs {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  lap: number;

  @Field(() => Int, { nullable: true })
  stopTimeMilliseconds?: number;

  @Field(() => Int, { nullable: true })
  timeMilliseconds?: number;

  @Field()
  eventSessionDriverId: string;
}
