import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

import { PrismaService } from '../app/services/prisma.service';
import { GqlThrottlerGuard } from './services/gql-throttler.guard';
import { ComplexityPlugin } from '../graphql/plugins/complexity.plugin';
import { SeriesResolver } from '../graphql/resolvers/series.resolver';
import { SeasonResolver } from '../graphql/resolvers/season.resolver';
import { DriverResolver } from '../graphql/resolvers/driver.resolver';
import { CircuitResolver } from '../graphql/resolvers/circuit.resolver';
import { TeamResolver } from '../graphql/resolvers/team.resolver';
import { VehicleResolver } from '../graphql/resolvers/vehicle.resolver';
import { SeasonTeamResolver } from '../graphql/resolvers/season-team.resolver';
import { SeasonTeamDriverResolver } from '../graphql/resolvers/season-team-driver.resolver';
import { EventResolver } from '../graphql/resolvers/event.resolver';
import { EventSessionResolver } from '../graphql/resolvers/event-session.resolver';
import { EventSessionTeamDriverResolver } from '../graphql/resolvers/event-season-team-driver.resolver';
import { SeasonTeamStandingEntryResolver } from '../graphql/resolvers/season-team-standing-entry.resolver';
import { SeasonTeamDriverStandingEntryResolver } from '../graphql/resolvers/season-team-driver-standing-entry.resolver';

@Module({
  imports: [
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
    ComplexityPlugin,
    PrismaService,
    SeriesResolver,
    CircuitResolver,
    TeamResolver,
    VehicleResolver,
    DriverResolver,
    SeasonResolver,
    SeasonTeamResolver,
    SeasonTeamDriverResolver,
    SeasonTeamStandingEntryResolver,
    SeasonTeamDriverStandingEntryResolver,
    EventResolver,
    EventSessionResolver,
    EventSessionTeamDriverResolver,
  ],
})
export class GraphQLModule {}
