import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionTeamDriverStartingGridArgs {
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