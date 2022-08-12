import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SeasonTeam {
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
