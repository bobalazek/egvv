import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionDriverArgs {
  @Field(() => Int, { nullable: true })
  number: number;

  @Field()
  eventSessionId: string;

  @Field()
  seasonDriverId: string;
}
