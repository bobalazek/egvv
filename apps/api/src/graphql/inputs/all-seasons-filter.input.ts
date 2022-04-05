import { InputType, Field } from '@nestjs/graphql';
import { AllFilterInput } from './all-filter.input';

@InputType()
export class AllSeasonsFilterInput extends AllFilterInput {
  @Field({ nullable: true })
  seriesId?: string;
}
