import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateSeriesArgs {
  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  url: string;
}
