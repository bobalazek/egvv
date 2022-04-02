import { ArgsType } from '@nestjs/graphql';

import { AllArgs } from './all';

@ArgsType()
export class AllTeamsArgs extends AllArgs {}
