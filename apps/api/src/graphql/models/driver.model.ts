import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Driver {
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
