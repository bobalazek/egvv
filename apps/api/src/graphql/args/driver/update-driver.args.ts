import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateDriverArgs {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  countryCode: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  nickname?: string;
}
