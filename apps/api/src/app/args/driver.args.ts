import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class DriverArgs {
  @Field(() => ID)
  id: number;
}
