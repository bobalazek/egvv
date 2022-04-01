import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Series {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  url: string;
}
