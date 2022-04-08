import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class EventSessionDriverClassification {
  @Field(() => ID)
  id: string;

  @Field()
  status: string;

  @Field(() => Int, { nullable: true })
  position?: number;

  @Field({ nullable: true })
  time?: Date;

  @Field(() => Float, { nullable: true })
  points?: number;

  @Field({ nullable: true })
  note?: string;

  @Field()
  eventSessionDriverId: string;
}