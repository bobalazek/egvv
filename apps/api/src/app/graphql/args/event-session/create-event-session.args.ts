import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionArgs {
  @Field()
  slug: string;

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
