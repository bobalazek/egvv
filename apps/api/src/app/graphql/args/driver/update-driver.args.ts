import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateDriverArgs } from './create-driver.args';

@ArgsType()
export class UpdateDriverArgs extends CreateDriverArgs {
  @Field(() => ID)
  id: string;
}
