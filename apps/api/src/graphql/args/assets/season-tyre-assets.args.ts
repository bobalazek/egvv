import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SeasonTyreAssetsArgs {
  @Field()
  seasonSlug: string;
}
