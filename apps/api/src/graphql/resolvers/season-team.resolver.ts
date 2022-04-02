import { Resolver, ResolveField, Parent, Query, Args } from '@nestjs/graphql';

import { PrismaService } from '../../app/services/prisma.service';
import { AllSeasonTeamsArgs } from '../args/all-season-teams.args';
import { IdArgs } from '../args/id.args';
import { ListMetadata } from '../models/list-metadata.model';
import { SeasonTeamDriver } from '../models/season-team-driver.model';
import { SeasonTeamStandingEntry } from '../models/season-team-standing-entry.model';
import { SeasonTeam } from '../models/season-team.model';
import { Season } from '../models/season.model';
import { Team } from '../models/team.model';
import { Vehicle } from '../models/vehicle.model';
import { AbstractResolver } from './abstract.resolver';

@Resolver(SeasonTeam)
export class SeasonTeamResolver extends AbstractResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    super();

    this._prismaService = prismaService;
  }

  @Query(() => SeasonTeam)
  async SeasonTeam(@Args() args: IdArgs) {
    return this._prismaService.team.findFirst({
      where: {
        id: args.id,
      },
    });
  }

  @Query(() => [SeasonTeam])
  async allSeasonTeams(@Args() args: AllSeasonTeamsArgs) {
    return this._prismaService.seasonTeam.findMany(this.getAllArgs(args));
  }

  @Query(() => ListMetadata)
  async _allSeasonTeamsMeta(@Args() args: AllSeasonTeamsArgs): Promise<ListMetadata> {
    const count = await this._prismaService.seasonTeam.count();
    return {
      count,
    };
  }

  @ResolveField('seasonTeamDrivers', () => [SeasonTeamDriver])
  async seasonTeamDrivers(@Parent() parent: SeasonTeam) {
    return this._prismaService.seasonTeamDriver.findMany({
      where: {
        seasonTeamId: parseInt(parent.id),
      },
    });
  }

  @ResolveField('season', () => Season)
  async season(@Parent() parent: SeasonTeam) {
    return this._prismaService.season.findFirst({
      where: {
        id: parent.seasonId,
      },
    });
  }

  @ResolveField('team', () => Team)
  async team(@Parent() parent: SeasonTeam) {
    return this._prismaService.team.findFirst({
      where: {
        id: parent.teamId,
      },
    });
  }

  @ResolveField('vehicle', () => Vehicle, { nullable: true })
  async vehicle(@Parent() parent: SeasonTeam) {
    if (!parent.vehicleId) {
      return null;
    }

    return this._prismaService.vehicle.findFirst({
      where: {
        id: parent.vehicleId,
      },
    });
  }

  @ResolveField('seasonTeamStandingEntries', () => [SeasonTeamStandingEntry])
  async seasonTeamStandingEntries(@Parent() parent: SeasonTeam) {
    return this._prismaService.seasonTeamStandingEntry.findMany({
      where: {
        seasonTeamId: parseInt(parent.id),
      },
    });
  }
}
