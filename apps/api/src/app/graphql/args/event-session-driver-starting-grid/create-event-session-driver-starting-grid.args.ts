import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionDriverStartingGridArgs {
  @Field()
  status: string;

  @Field(() => Int, { nullable: true })
  position?: number;

  @Field(() => Int, { nullable: true })
  timeMilliseconds?: number;

  @Field({ nullable: true })
  tyres?: string;

  @Field({ nullable: true })
  note?: string;

  @Field()
  eventSessionDriverId: string;
}
