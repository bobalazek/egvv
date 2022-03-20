import { ArgsType, Field } from '@nestjs/graphql';

import { PaginationArgs } from './pagination.args';

@ArgsType()
export class EventArgs extends PaginationArgs {
  @Field(() => String)
  seriesSlug: string;
}
