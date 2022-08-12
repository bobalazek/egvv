import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateCircuitArgs } from './create-circuit.args';

@ArgsType()
export class UpdateCircuitArgs extends CreateCircuitArgs {
  @Field(() => ID)
  id: string;
}
