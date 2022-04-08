import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class EventSessionDriverLap {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  lap: number;

  @Field({ nullable: true })
  time?: Date;

  @Field({ nullable: true })
  position?: number;

  @Field()
  eventSessionDriverId: string;
}
