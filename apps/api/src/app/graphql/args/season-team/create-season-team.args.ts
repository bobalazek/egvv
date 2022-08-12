import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateSeasonTeamArgs {
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
