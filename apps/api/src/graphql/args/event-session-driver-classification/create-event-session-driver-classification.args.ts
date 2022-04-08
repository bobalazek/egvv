import { Field, ArgsType, Int, Float } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionDriverClassificationArgs {
  @Field()
  status: string;

  @Field(() => Int, { nullable: true })
  position?: number;

  @Field({ nullable: true })
  time?: Date;

  @Field(() => Float, { nullable: true })
  points?: number;

  @Field({ nullable: true })
  note?: string;

  @Field()
  eventSessionDriverId: string;
}
