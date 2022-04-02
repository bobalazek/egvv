import { ArgsType, Field } from '@nestjs/graphql';

import { AllArgs } from './all';

@ArgsType()
export class AllEventsArgs extends AllArgs {
  @Field(() => String)
  seriesSlug: string;
}
