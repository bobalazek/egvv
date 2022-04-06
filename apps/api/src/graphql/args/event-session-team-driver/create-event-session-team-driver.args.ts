import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionTeamDriverArgs {
  @Field(() => Int, { nullable: true })
  number: number;

  @Field()
  eventSessionId: string;

  @Field()
  seasonTeamDriverId: string;

  @Field({ nullable: true })
  vehicleId?: string;
}
