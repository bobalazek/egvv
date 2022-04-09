import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateSeasonTeamArgs {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  shortName: string;

  @Field()
  powerUnit: string;

  @Field()
  chassis: string;

  @Field()
  seasonId: string;

  @Field()
  teamId: string;
}
