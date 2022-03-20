import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EventArgs {
  @Field(() => String)
  seriesSlug: string;
}
