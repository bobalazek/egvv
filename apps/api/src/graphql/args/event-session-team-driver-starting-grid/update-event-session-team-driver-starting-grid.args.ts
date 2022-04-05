import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateEventSessionTeamDriverDriverStartingGridArgs {
  @Field(() => ID)
  id: string;

  @Field()
  status: string;

  @Field(() => Int, { nullable: true })
  position?: number;

  @Field({ nullable: true })
  time?: Date;

  @Field({ nullable: true })
  note?: string;

  @Field()
  eventSessionTeamDriverId: string;
}
