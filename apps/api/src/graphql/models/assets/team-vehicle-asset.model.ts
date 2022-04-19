import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TeamVehicleAsset {
  @Field()
  url: string;

  @Field()
  key: string;

  @Field()
  name: string;

  @Field()
  seasonTeamName: string;

  @Field()
  teamSlug: string;

  @Field()
  seasonSlug: string;
}
