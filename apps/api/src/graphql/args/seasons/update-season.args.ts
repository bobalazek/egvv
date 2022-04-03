import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateSeasonArgs {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field(() => Int)
  year: number;

  @Field()
  startAt: Date;

  @Field({ nullable: true })
  endAt?: Date;

  @Field()
  seriesId: string;
}
