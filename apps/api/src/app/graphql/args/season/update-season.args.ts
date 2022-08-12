import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateSeasonArgs } from './create-season.args';

@ArgsType()
export class UpdateSeasonArgs extends CreateSeasonArgs {
  @Field(() => ID)
  id: string;
}
