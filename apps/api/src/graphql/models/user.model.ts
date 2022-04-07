import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field(() => [String], { nullable: true })
  roles?: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
