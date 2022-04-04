import { Field, ArgsType, Int, Float } from '@nestjs/graphql';

@ArgsType()
export class CreateSeasonTeamDriverArgs {
  @Field(() => Int)
  number: number;

  @Field()
  code: string;

  @Field()
  isTemporary: boolean;

  @Field()
  seasonTeamId: string;

  @Field()
  driverId: string;
}
