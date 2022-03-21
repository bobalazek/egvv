import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class SeasonArgs {
  @Field(() => ID)
  id: number;
}
