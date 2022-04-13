import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class EventSessionDriverLap {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  lap: number;

  @Field(() => Int, { nullable: true })
  timeInMilliseconds?: number;

  @Field({ nullable: true })
  position?: number;

  @Field()
  eventSessionDriverId: string;
}
