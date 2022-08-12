import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ListMetadata {
  @Field(() => Int)
  count: number;
}
