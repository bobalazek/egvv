import { ArgsType, Field, Float, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateEventSessionTeamDriverDriverClassificationArgs {
  @Field(() => ID)
  id: string;

  @Field()
  status: string;

  @Field(() => Int, { nullable: true })
  position?: number;

  @Field({ nullable: true })
  time?: Date;

  @Field(() => Float, { nullable: true })
  points?: number;

  @Field({ nullable: true })
  note?: string;

  @Field()
  eventSessionTeamDriverId: string;
}
