import { ArgsType, Field, ID } from '@nestjs/graphql';

import { CreateEventSessionDriverClassificationArgs } from './create-event-session-driver-classification.args';

@ArgsType()
export class UpdateEventSessionDriverDriverClassificationArgs extends CreateEventSessionDriverClassificationArgs {
  @Field(() => ID)
  id: string;
}
