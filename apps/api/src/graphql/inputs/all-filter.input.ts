import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class AllFilterInput {
  @Field({ nullable: true })
  q?: string;

  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => [ID], { nullable: true })
  ids?: string[];
}
