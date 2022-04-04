import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateVehicleArgs {
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
