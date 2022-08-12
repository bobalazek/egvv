import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

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

  @Field(() => Float, { nullable: true })
  locationLatitude?: number;

  @Field(() => Float, { nullable: true })
  locationLongitude?: number;

  @Field()
  countryCode: string;

  @Field()
  timezone: string;

  @Field()
  url: string;
}
