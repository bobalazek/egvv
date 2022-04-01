import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  page = 1;

  @Field(() => Int)
  perPage = 10;

  @Field({ nullable: true })
  sortField?: string;

  @Field({ nullable: true })
  sortOrder?: string;
}
