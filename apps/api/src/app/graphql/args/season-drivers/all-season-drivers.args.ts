import { ArgsType, Field } from '@nestjs/graphql';

import { AllArgs } from '../all.args';
import { AllSeasonDriversFilterInput } from '../../inputs/all-season-drivers-filter.input';

@ArgsType()
export class AllSeasonDriversArgs extends AllArgs {
  @Field({ nullable: true })
  filter?: AllSeasonDriversFilterInput;
}
