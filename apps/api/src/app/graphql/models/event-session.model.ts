import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class EventSession {
  @Field(() => ID)
  id: string;

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
