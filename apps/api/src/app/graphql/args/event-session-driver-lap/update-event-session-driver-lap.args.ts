import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateEventSessionDriverLapArgs } from './create-event-session-driver-lap.args';

@ArgsType()
export class UpdateEventSessionDriverLapArgs extends CreateEventSessionDriverLapArgs {
  @Field(() => ID)
  id: string;
}
