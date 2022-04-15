import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateEventSessionDriverArgs } from './create-event-session-driver.args';

@ArgsType()
export class UpdateEventSessionDriverDriverArgs extends CreateEventSessionDriverArgs {
  @Field(() => ID)
  id: string;
}
