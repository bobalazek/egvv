/* eslint-disable @typescript-eslint/no-inferrable-types */

import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class AllArgs {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  perPage?: number;

  @Field({ nullable: true })
  sortField?: string;

  @Field({ nullable: true })
  sortOrder?: string;
}
