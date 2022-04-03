import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class EventSessionTeamDriver {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  number: number;

  @Field()
  code: string;

  @Field()
  eventSessionId: string;

  @Field()
  seasonTeamDriverId: string;

  @Field({ nullable: true })
  vehicleId?: string;
}
