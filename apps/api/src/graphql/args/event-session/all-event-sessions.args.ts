import { ArgsType, Field } from '@nestjs/graphql';

import { AllArgs } from '../all.args';
import { AllEventSessionsFilterInput } from '../../inputs/all-event-sessions-filter.input';

@ArgsType()
export class AllEventSessionsArgs extends AllArgs {
  @Field({ nullable: true })
  filter?: AllEventSessionsFilterInput;
}
