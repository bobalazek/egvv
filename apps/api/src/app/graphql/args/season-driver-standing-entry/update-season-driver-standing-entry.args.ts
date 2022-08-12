import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateSeasonDriverStandingEntryArgs } from './create-season-driver-standing-entry.args';

@ArgsType()
export class UpdateSeasonDriverStandingEntryArgs extends CreateSeasonDriverStandingEntryArgs {
  @Field(() => ID)
  id: string;
}
