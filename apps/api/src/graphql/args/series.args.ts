import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class SeriesArgs {
  @Field(() => ID)
  id: number;
}
