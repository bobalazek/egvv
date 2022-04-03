import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

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
  isDefunct: boolean;

  @Field()
  seasonId: string;

  @Field()
  teamId: string;

  @Field({ nullable: true })
  vehicleId?: string;
}
