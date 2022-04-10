import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateDriverArgs {
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
