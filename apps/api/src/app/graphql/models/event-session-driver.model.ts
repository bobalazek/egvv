import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class EventSessionDriver {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  number: number;

  @Field()
  eventSessionId: string;

  @Field()
  seasonDriverId: string;
}
