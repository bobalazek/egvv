import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { GraphQLModule } from '../graphql/graphql.module';

@Module({
  imports: [AuthModule, GraphQLModule],
})
export class AppModule {}
