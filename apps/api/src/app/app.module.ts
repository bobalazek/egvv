import { Module } from '@nestjs/common';

import { GraphQLModule } from '../graphql/graphql.module';
import { AssetsModule } from '../assets/assets.module';

@Module({
  imports: [GraphQLModule, AssetsModule],
})
export class AppModule {}
