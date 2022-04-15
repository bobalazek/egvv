import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateEventSessionDriverPitStopArgs } from './create-event-session-driver-pit-stop.args';

@ArgsType()
export class UpdateEventSessionDriverPitStopArgs extends CreateEventSessionDriverPitStopArgs {
  @Field(() => ID)
  id: string;
}
