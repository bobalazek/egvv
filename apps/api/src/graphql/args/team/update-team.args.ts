import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateTeamArgs {
  @Field(() => ID)
  id: string;

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

  @Field()
  debutAt: Date;

  @Field({ nullable: true })
  defunctAt?: Date;

  @Field({ nullable: true })
  predecessorTeamId?: string;
}
