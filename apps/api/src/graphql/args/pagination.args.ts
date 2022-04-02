/* eslint-disable @typescript-eslint/no-inferrable-types */

import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  page = 1;

  @Field(() => Int)
  perPage = 10;

  @Field()
  sortField: string = 'id';

  @Field()
  sortOrder: string = 'DESC';
}
