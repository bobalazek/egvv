import { ArgsType } from '@nestjs/graphql';

import { PaginationArgs } from './pagination.args';

@ArgsType()
export class DriversArgs extends PaginationArgs {}
