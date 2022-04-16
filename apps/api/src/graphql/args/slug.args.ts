import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SlugArgs {
  @Field()
  slug: string;
}
