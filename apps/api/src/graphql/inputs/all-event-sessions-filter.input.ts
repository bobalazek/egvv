import { InputType, Field } from '@nestjs/graphql';
import { AllFilterInput } from './all-filter.input';

@InputType()
export class AllEventSessionsFilterInput extends AllFilterInput {
  @Field({ nullable: true })
  eventId?: string;

  @Field({ nullable: true })
  seasonTeamId?: string;
}
