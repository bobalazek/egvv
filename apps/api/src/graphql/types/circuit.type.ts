import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Circuit {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  location: string;

  @Field()
  countryCode: string;

  @Field()
  url: string;
}
