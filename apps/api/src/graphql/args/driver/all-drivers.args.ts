import { ArgsType } from '@nestjs/graphql';

import { AllArgs } from '../all.args';

@ArgsType()
export class AllDriversArgs extends AllArgs {}
