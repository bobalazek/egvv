import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateEventSessionDriverDriverLapArgs {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  lap: number;

  @Field(() => Int, { nullable: true })
  timeMilliseconds?: number;

  @Field({ nullable: true })
  position?: number;

  @Field()
  eventSessionDriverId: string;
}
