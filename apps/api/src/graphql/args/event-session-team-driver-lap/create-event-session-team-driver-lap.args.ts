import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionTeamDriverLapArgs {
  @Field(() => Int)
  lap: number;

  @Field({ nullable: true })
  time?: Date;

  @Field({ nullable: true })
  position?: number;

  @Field()
  eventSessionTeamDriverId: string;
}
