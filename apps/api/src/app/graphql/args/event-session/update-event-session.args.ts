import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateEventSessionArgs } from './create-event-session.args';

@ArgsType()
export class UpdateEventSessionArgs extends CreateEventSessionArgs {
  @Field(() => ID)
  id: string;
}
