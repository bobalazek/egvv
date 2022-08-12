import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateSeasonTeamStandingEntryArgs } from './create-season-team-standing-entry.args';

@ArgsType()
export class UpdateSeasonTeamStandingEntryArgs extends CreateSeasonTeamStandingEntryArgs {
  @Field(() => ID)
  id: string;
}
