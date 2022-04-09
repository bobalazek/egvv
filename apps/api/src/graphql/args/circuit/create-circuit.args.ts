import { Field, ArgsType, Float } from '@nestjs/graphql';

@ArgsType()
export class CreateCircuitArgs {
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
