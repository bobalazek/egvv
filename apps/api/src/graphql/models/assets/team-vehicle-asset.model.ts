import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TeamVehicleAsset {
  @Field()
  url: string;

  @Field()
  name: string;

  @Field()
  teamId: string;

  @Field()
  seasonTeamId: string;

  @Field()
  seasonId: string;
}
