import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => [String], { nullable: true })
  roles?: string[];

  @Field()
  isLocked: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
