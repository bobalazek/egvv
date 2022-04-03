import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class SeasonTeamDriver {
  @Field(() => ID)
  id: string;

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
