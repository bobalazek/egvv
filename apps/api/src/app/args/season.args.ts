import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SeasonArgs {
  @Field(() => String)
  seriesSlug: string;
}
