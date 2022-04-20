import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { API_SERVER_GRAPHQL_PATH, JWT_SECRET } from '@egvv/shared-constants';
import { PrismaService } from '../app/services/prisma.service';
import { GqlThrottlerGuard } from './guards/gql-throttler.guard';
import { ComplexityPlugin } from './plugins/complexity.plugin';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AbstractResolver } from './resolvers/abstract.resolver';
import { SeriesResolver } from '../graphql/resolvers/series.resolver';
import { SeasonResolver } from '../graphql/resolvers/season.resolver';
import { DriverResolver } from '../graphql/resolvers/driver.resolver';
import { CircuitResolver } from '../graphql/resolvers/circuit.resolver';
import { TeamResolver } from '../graphql/resolvers/team.resolver';
import { SeasonTeamResolver } from '../graphql/resolvers/season-team.resolver';
import { SeasonDriverResolver } from './resolvers/season-driver.resolver';
import { EventResolver } from '../graphql/resolvers/event.resolver';
import { EventSessionResolver } from '../graphql/resolvers/event-session.resolver';
import { EventSessionDriverResolver } from './resolvers/event-session-driver.resolver';
import { EventSessionDriverLapResolver } from './resolvers/event-session-driver-lap.resolver';
import { EventSessionDriverPitStopResolver } from './resolvers/event-session-driver-pit-stop.resolver';
import { EventSessionDriverStartingGridResolver } from './resolvers/event-session-driver-starting-grid.resolver';
import { EventSessionDriverClassificationResolver } from './resolvers/event-session-driver-classification.resolver';
import { SeasonTeamStandingEntryResolver } from '../graphql/resolvers/season-team-standing-entry.resolver';
import { SeasonDriverStandingEntryResolver } from './resolvers/season-driver-standing-entry.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { AuthResolver } from './resolvers/auth.resolver';
import { TeamVehicleAssetResolver } from './resolvers/assets/team-vehicle-asset.resolver';

@Module({
  imports: [
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: API_SERVER_GRAPHQL_PATH,
      context: ({ req, res }) => ({ req, res }),
    }),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
    ComplexityPlugin,
    PrismaService,
    AuthService,
    JwtStrategy,
    AbstractResolver,
    SeriesResolver,
    CircuitResolver,
    TeamResolver,
    DriverResolver,
    SeasonResolver,
    SeasonTeamResolver,
    SeasonDriverResolver,
    SeasonTeamStandingEntryResolver,
    SeasonDriverStandingEntryResolver,
    EventResolver,
    EventSessionResolver,
    EventSessionDriverResolver,
    EventSessionDriverLapResolver,
    EventSessionDriverPitStopResolver,
    EventSessionDriverStartingGridResolver,
    EventSessionDriverClassificationResolver,
    UserResolver,
    AuthResolver,
    TeamVehicleAssetResolver,
  ],
})
export class GraphQLModule {}
