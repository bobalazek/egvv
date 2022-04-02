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

  @Field(() => Int)
  seasonId: number;

  @Field(() => Int)
  teamId: number;

  @Field(() => Int, { nullable: true })
  vehicleId?: number;
}
