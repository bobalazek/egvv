import { Module } from '@nestjs/common';

import { GraphQLModule } from '../graphql/graphql.module';
import { CrudModule } from '../crud/crud.module';

@Module({
  imports: [GraphQLModule, CrudModule],
})
export class AppModule {}
