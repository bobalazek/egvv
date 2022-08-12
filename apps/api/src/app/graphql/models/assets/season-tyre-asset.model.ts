import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SeasonTyreAsset {
  @Field()
  url: string;

  @Field()
  key: string;

  @Field()
  type: string;

  @Field()
  name: string;

  @Field()
  seasonId: string;
}
