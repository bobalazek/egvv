import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateVehicleArgs {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  powerUnit: string;

  @Field()
  modelUrl: string;

  @Field({ nullable: true })
  note?: string;
}
