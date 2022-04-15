import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateEventArgs } from './create-event.args';

@ArgsType()
export class UpdateEventArgs extends CreateEventArgs {
  @Field(() => ID)
  id: string;
}
