import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Season {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field(() => Int)
  seriesId: number;
}
