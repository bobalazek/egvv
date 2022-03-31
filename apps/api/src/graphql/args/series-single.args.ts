import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class SeriesSingleArgs {
  @Field(() => ID)
  id: number;
}
