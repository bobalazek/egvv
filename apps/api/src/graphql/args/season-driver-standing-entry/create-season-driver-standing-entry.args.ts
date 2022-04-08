import { Field, ArgsType, Float } from '@nestjs/graphql';

@ArgsType()
export class CreateSeasonDriverStandingEntryArgs {
  @Field(() => Float)
  points: number;

  @Field()
  dateAt: Date;

  @Field({ nullable: true })
  note?: string;

  @Field()
  seasonDriverId: string;

  @Field()
  eventSessionId: string;
}
