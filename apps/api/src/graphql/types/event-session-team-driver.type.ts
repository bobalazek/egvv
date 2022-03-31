import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class EventSessionTeamDriver {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  number: number;

  @Field()
  code: string;

  @Field(() => Int)
  eventSessionId: number;

  @Field(() => Int)
  seasonTeamDriverId: number;

  @Field(() => Int)
  vehicleId?: number;
}
