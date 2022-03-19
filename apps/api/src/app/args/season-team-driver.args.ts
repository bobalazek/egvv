import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SeasonTeamDriverArgs {
  @Field(() => String)
  seasonSlug: string;
}
