import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EventSessionArgs {
  @Field(() => String)
  eventSlug: string;
}
