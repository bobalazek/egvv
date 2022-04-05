import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateEventSessionTeamDriverDriverLapArgs {
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
