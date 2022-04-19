import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class TeamVehicleAssetsArgs {
  @Field()
  seasonSlug: string;

  @Field({ nullable: true })
  teamSlug?: string;
}
