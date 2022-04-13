import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionDriverLapArgs {
  @Field(() => Int)
  lap: number;

  @Field(() => Int, { nullable: true })
  timeInMilliseconds?: number;

  @Field({ nullable: true })
  position?: number;

  @Field()
  eventSessionDriverId: string;
}
