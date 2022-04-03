import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class EventSessionTeamDriverLap {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  lap: number;

  @Field({ nullable: true })
  time?: Date;

  @Field({ nullable: true })
  position?: number;

  @Field()
  eventSessionTeamDriverId: string;
}
