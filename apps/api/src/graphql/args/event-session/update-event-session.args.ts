import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateEventSessionArgs {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  startAt: Date;

  @Field({ nullable: true })
  endAt?: Date;

  @Field()
  eventId: string;
}
