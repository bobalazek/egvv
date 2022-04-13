import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class EventSessionDriverClassification {
  @Field(() => ID)
  id: string;

  @Field()
  status: string;

  @Field(() => Int, { nullable: true })
  position?: number;

  @Field(() => Int, { nullable: true })
  timeInMilliseconds?: number;

  @Field({ nullable: true })
  laps?: number;

  @Field({ nullable: true })
  lapsBehind?: number;

  @Field(() => Float, { nullable: true })
  points?: number;

  @Field({ nullable: true })
  note?: string;

  @Field()
  eventSessionDriverId: string;
}
