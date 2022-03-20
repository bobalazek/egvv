import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Team {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  countryCode: string;

  @Field()
  url: string;

  @Field()
  debutAt: Date;

  @Field({ nullable: true })
  defunctAt?: Date;

  @Field(() => Int, { nullable: true })
  predecessorTeamId?: number;
}
