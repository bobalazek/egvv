import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateEventSessionDriverDriverStartingGridArgs {
  @Field(() => ID)
  id: string;

  @Field()
  status: string;

  @Field(() => Int, { nullable: true })
  position?: number;

  @Field(() => Int, { nullable: true })
  timeInMilliseconds?: number;

  @Field({ nullable: true })
  note?: string;

  @Field()
  eventSessionDriverId: string;
}
