import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SeasonTeamArgs {
  @Field(() => String)
  seasonSlug: string;
}
