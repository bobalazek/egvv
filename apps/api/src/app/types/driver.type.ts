import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Driver {
  @Field(() => ID)
  id!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  nationalityCountryCode!: string;

  @Field({ nullable: true })
  url?: string;
}
