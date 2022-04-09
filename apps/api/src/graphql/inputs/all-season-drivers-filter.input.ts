import { InputType, Field } from '@nestjs/graphql';
import { AllFilterInput } from './all-filter.input';

@InputType()
export class AllSeasonDriversFilterInput extends AllFilterInput {
  @Field({ nullable: true })
  seasonId?: string;
}
