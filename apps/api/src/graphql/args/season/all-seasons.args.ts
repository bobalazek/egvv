import { ArgsType, Field } from '@nestjs/graphql';

import { AllArgs } from '../all.args';
import { AllSeasonsFilterInput } from '../../inputs/all-seasons-filter.input';

@ArgsType()
export class AllSeasonsArgs extends AllArgs {
  @Field({ nullable: true })
  filter?: AllSeasonsFilterInput;
}
