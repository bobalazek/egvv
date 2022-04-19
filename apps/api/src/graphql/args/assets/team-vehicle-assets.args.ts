import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class TeamVehicleAssetsArgs {
  @Field({ nullable: true })
  seasonSlug?: string;

  @Field({ nullable: true })
  teamSlug?: string;
}
