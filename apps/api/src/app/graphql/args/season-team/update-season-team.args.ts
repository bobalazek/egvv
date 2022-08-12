import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateSeasonTeamArgs } from './create-season-team.args';

@ArgsType()
export class UpdateSeasonTeamArgs extends CreateSeasonTeamArgs {
  @Field(() => ID)
  id: string;
}
