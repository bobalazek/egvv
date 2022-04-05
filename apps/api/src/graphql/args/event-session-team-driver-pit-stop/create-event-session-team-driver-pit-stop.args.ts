import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionTeamDriverPitStopArgs {
  @Field(() => Int)
  lap: number;

  @Field({ nullable: true })
  timeMilliseconds?: number;

  @Field()
  eventSessionTeamDriverId: string;
}
