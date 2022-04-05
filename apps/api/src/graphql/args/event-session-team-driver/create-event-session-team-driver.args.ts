import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionTeamDriverArgs {
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
