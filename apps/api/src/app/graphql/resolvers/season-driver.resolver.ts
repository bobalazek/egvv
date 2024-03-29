import { Resolver, ResolveField, Parent, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { IdArgs } from '../args/id.args';
import { Driver } from '../models/driver.model';
import { ListMetadata } from '../models/list-metadata.model';
import { SeasonDriverStandingEntry } from '../models/season-driver-standing-entry.model';
import { SeasonDriver } from '../models/season-driver.model';
import { SeasonTeam } from '../models/season-team.model';
import { AbstractResolver } from './abstract.resolver';
import { AllSeasonDriversArgs } from '../args/season-drivers/all-season-drivers.args';
import { CreateSeasonDriverArgs } from '../args/season-drivers/create-season-driver.args';
import { UpdateSeasonDriverArgs } from '../args/season-drivers/update-season-driver.args';
import { GqlAuthGuard } from '../guards/gql-auth.guard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any;

@Resolver(SeasonDriver)
export class SeasonDriverResolver extends AbstractResolver {
  @Query(() => SeasonDriver)
  async SeasonDriver(@Args() args: IdArgs) {
    return this._prismaService.seasonDriver.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [SeasonDriver])
  async allSeasonDrivers(@Args() args: AllSeasonDriversArgs) {
    let prismaArgs = await this.getPrismaArgs(
      args,
      false,
      ['code', 'seasonTeam.name', 'seasonTeam.season.name'],
      [
        {
          filterField: 'seasonId',
          model: 'seasonTeam',
        },
        {
          filterField: 'seasonTeamId',
        },
      ]
    );
    prismaArgs = this._updatePrismaArgs(prismaArgs, args);

    return this._prismaService.seasonDriver.findMany(prismaArgs);
  }

  @Query(() => ListMetadata)
  async _allSeasonDriversMeta(@Args() args: AllSeasonDriversArgs): Promise<ListMetadata> {
    let prismaArgs = await this.getPrismaArgs(
      args,
      true,
      ['code', 'seasonTeam.name', 'seasonTeam.season.name'],
      [
        {
          filterField: 'seasonId',
          model: 'seasonTeam',
        },
        {
          filterField: 'seasonTeamId',
        },
      ]
    );
    prismaArgs = this._updatePrismaArgs(prismaArgs, args);

    const count = await this._prismaService.seasonDriver.count(prismaArgs);

    return {
      count,
    };
  }

  @Mutation(() => SeasonDriver)
  @UseGuards(GqlAuthGuard)
  async createEvent(@Args() args: CreateSeasonDriverArgs) {
    return this._prismaService.seasonDriver.create({
      data: args,
    });
  }

  @Mutation(() => SeasonDriver)
  @UseGuards(GqlAuthGuard)
  async updateSeasonDriver(@Args() args: UpdateSeasonDriverArgs) {
    return this._prismaService.seasonDriver.update({
      where: {
        id: args.id,
      },
      data: args,
    });
  }

  @Mutation(() => SeasonDriver)
  @UseGuards(GqlAuthGuard)
  async deleteSeasonDriver(@Args() args: IdArgs) {
    return this._prismaService.seasonDriver.delete({
      where: {
        id: args.id,
      },
    });
  }

  @ResolveField('name', () => String)
  async name(@Parent() parent: SeasonDriver) {
    const seasonTeam = await this._prismaService.seasonTeam.findFirst({
      where: {
        id: parent.seasonTeamId,
      },
      include: {
        season: true,
      },
    });

    return `${parent.code} (${parent.number}) @ ${seasonTeam.shortName} (${seasonTeam.season.name})`;
  }

  @ResolveField('seasonTeam', () => SeasonTeam)
  async seasonTeam(@Parent() parent: SeasonDriver) {
    return this._prismaService.seasonTeam.findFirst({
      where: {
        id: parent.seasonTeamId,
      },
    });
  }

  @ResolveField('driver', () => Driver)
  async driver(@Parent() parent: SeasonDriver) {
    return this._prismaService.driver.findFirst({
      where: {
        id: parent.driverId,
      },
    });
  }

  @ResolveField('seasonDriverStandingEntries', () => [SeasonDriverStandingEntry])
  async seasonDriverStandingEntries(@Parent() parent: SeasonTeam) {
    return this._prismaService.seasonDriverStandingEntry.findMany({
      where: {
        seasonDriverId: parent.id,
      },
    });
  }

  private _updatePrismaArgs(prismaArgs: AsyncReturnType<typeof this.getPrismaArgs>, args: AllSeasonDriversArgs) {
    if (args.filter.eventSessionId) {
      if (!prismaArgs.where) {
        prismaArgs.where = {};
      }
      if (!prismaArgs.where.AND) {
        prismaArgs.where.AND = [];
      }
      prismaArgs.where.AND.push({
        seasonTeam: {
          season: {
            events: {
              some: {
                eventSessions: {
                  some: {
                    id: args.filter.eventSessionId,
                  },
                },
              },
            },
          },
        },
      });
    }

    return prismaArgs;
  }
}
