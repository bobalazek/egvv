import { ArgsType, Field, Float, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateSeasonDriverStandingEntryArgs {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  points: number;

  @Field()
  dateAt: Date;

  @Field({ nullable: true })
  note?: string;

  @Field()
  seasonDriverId: string;

  @Field({ nullable: true })
  eventSessionId?: string;
}
