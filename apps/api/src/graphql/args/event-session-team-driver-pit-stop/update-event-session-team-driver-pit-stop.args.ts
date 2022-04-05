import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateEventSessionTeamDriverDriverPitStopArgs {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  lap: number;

  @Field({ nullable: true })
  timeMilliseconds?: number;

  @Field()
  eventSessionTeamDriverId: string;
}
