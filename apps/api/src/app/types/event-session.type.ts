import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class EventSession {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field(() => Int)
  eventId: number;
}
