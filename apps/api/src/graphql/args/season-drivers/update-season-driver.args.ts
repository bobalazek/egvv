import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateSeasonDriverArgs } from './create-season-driver.args';

@ArgsType()
export class UpdateSeasonDriverArgs extends CreateSeasonDriverArgs {
  @Field(() => ID)
  id: string;
}
