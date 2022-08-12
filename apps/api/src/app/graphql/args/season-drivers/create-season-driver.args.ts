import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateSeasonDriverArgs {
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
