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
  seasonTeamId: string;
}
