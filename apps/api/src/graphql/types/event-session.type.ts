import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class EventSession {
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

  @Field(() => Int)
  eventId: number;
}
