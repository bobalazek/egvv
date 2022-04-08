import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class CreateEventSessionDriverLapArgs {
  @Field(() => Int)
  lap: number;

  @Field({ nullable: true })
  time?: Date;

  @Field({ nullable: true })
  position?: number;

  @Field()
  eventSessionDriverId: string;
}
