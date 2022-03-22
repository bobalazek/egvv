import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

import { GqlThrottlerGuard } from './services/gql-throttler.guard';
import { ComplexityPlugin } from './plugins/complexity.plugin';
import { PrismaService } from './services/prisma.service';
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
import { SeasonTeamStandingEntryResolver } from './resolvers/season-team-standing-entry.resolver';
import { SeasonTeamDriverStandingEntryResolver } from './resolvers/season-team-driver-standing-entry.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  providers: [
    /*
    // TODO: not working yet
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
    */
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
export class AppModule {}
