import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateSeasonDriverArgs {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  number: number;

  @Field()
  code: string;

  @Field()
  isTemporary: boolean;

  @Field()
  seasonTeamId: string;

  @Field()
  driverId: string;
}
