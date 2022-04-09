import { ArgsType, Field } from '@nestjs/graphql';

import { AllArgs } from '../all.args';
import { AllSeasonTeamsFilterInput } from '../../inputs/all-season-teams-filter.input';

@ArgsType()
export class AllSeasonTeamsArgs extends AllArgs {
  @Field({ nullable: true })
  filter?: AllSeasonTeamsFilterInput;
}
