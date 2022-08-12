import { ArgsType } from '@nestjs/graphql';

import { AllArgs } from '../all.args';

@ArgsType()
export class AllUsersArgs extends AllArgs {}
