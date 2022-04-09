import { InputType, Field } from '@nestjs/graphql';
import { AllFilterInput } from './all-filter.input';

@InputType()
export class AllSeasonTeamsFilterInput extends AllFilterInput {
  @Field({ nullable: true })
  seasonId?: string;
}
