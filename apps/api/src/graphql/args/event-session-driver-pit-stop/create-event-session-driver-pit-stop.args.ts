import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionDriverPitStopArgs {
  @Field(() => Int)
  lap: number;

  @Field({ nullable: true })
  timeMilliseconds?: number;

  @Field()
  eventSessionDriverId: string;
}
