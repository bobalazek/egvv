import { ArgsType, Field, Float, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateCircuitArgs {
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
  url: string;
}
