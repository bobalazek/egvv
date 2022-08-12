import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateEventSessionDriverStartingGridArgs } from './create-event-session-driver-starting-grid.args';

@ArgsType()
export class UpdateEventSessionDriverStartingGridArgs extends CreateEventSessionDriverStartingGridArgs {
  @Field(() => ID)
  id: string;
}
