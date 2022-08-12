import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateSeriesArgs } from './create-series.args';

@ArgsType()
export class UpdateSeriesArgs extends CreateSeriesArgs {
  @Field(() => ID)
  id: string;
}
