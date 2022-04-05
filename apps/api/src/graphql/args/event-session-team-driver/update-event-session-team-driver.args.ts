import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateEventSessionTeamDriverDriverArgs {
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
