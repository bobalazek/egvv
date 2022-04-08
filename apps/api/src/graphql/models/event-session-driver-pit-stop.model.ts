import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class EventSessionDriverPitStop {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  lap: number;

  @Field({ nullable: true })
  timeMilliseconds?: number;

  @Field()
  eventSessionDriverId: string;
}
