import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  powerUnit: string;

  @Field({ nullable: true })
  note: string;
}
