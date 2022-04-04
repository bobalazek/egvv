import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateSeasonArgs {
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
