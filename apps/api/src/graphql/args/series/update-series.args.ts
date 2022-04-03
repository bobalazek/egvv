import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateSeriesArgs {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  url: string;
}
