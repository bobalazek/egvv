import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { PrismaService } from '../services/prisma.service';
import { SeriesResolver } from './resolvers/series.resolver';
import { SeasonResolver } from './resolvers/season.resolver';
import { DriverResolver } from './resolvers/driver.resolver';
import { CircuitResolver } from './resolvers/circuit.resolver';
import { TeamResolver } from './resolvers/team.resolver';
import { VehicleResolver } from './resolvers/vehicle.resolver';
import { SeasonTeamResolver } from './resolvers/season-team.resolver';
import { SeasonTeamDriverResolver } from './resolvers/season-team-driver.resolver';
import { EventResolver } from './resolvers/event.resolver';
import { EventSessionResolver } from './resolvers/event-session.resolver';
import { EventSessionTeamDriverResolver } from './resolvers/event-season-team-driver.resolver';
import { SeasonTeamPointStandingsEntryResolver } from './resolvers/season-team-point-standings-entry.resolver';
import { SeasonTeamDriverPointStandingsEntryResolver } from './resolvers/season-team-driver-point-standings-entry.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [
    PrismaService,
    CircuitResolver,
    TeamResolver,
    VehicleResolver,
    SeriesResolver,
    SeasonResolver,
    SeasonTeamResolver,
    SeasonTeamDriverResolver,
    SeasonTeamPointStandingsEntryResolver,
    SeasonTeamDriverPointStandingsEntryResolver,
    DriverResolver,
    EventResolver,
    EventSessionResolver,
    EventSessionTeamDriverResolver,
  ],
})
export class AppModule {}
