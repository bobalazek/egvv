import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class EventSessionTeamDriver {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  number: number;

  @Field()
  eventSessionId: string;

  @Field()
  seasonTeamDriverId: string;

  @Field({ nullable: true })
  vehicleId?: string;
}
