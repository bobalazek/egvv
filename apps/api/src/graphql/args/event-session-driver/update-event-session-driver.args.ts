import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateEventSessionDriverDriverArgs {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  number: number;

  @Field()
  eventSessionId: string;

  @Field()
  seasonDriverId: string;
}