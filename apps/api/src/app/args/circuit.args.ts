import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class CircuitArgs {
  @Field(() => ID)
  id: number;

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
