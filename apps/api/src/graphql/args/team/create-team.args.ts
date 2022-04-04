import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateTeamArgs {
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
