import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { SeriesResolver } from './resolvers/series.resolver';
import { SeasonResolver } from './resolvers/season.resolver';
import { DriverResolver } from './resolvers/driver.resolver';
import { PrismaService } from '../services/prisma.service';
import { CircuitResolver } from './resolvers/circuit.resolver';
import { TeamResolver } from './resolvers/team.resolver';
import { VehicleResolver } from './resolvers/vehicle.resolver';
import { SeasonTeamResolver } from './resolvers/season-team.resolver';
import { SeasonTeamDriverResolver } from './resolvers/season-team-driver.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [
    CircuitResolver,
    TeamResolver,
    VehicleResolver,
    SeriesResolver,
    SeasonResolver,
    SeasonTeamResolver,
    SeasonTeamDriverResolver,
    DriverResolver,
    PrismaService,
  ],
})
export class AppModule {}
