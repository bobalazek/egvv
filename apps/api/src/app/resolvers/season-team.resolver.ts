import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';

import { PrismaService } from '../../services/prisma.service';
import { SeasonTeamArgs } from '../args/season-team.args';
import { SeasonTeam } from '../types/season-team.type';
import { Season } from '../types/season.type';
import { Team } from '../types/team.type';
import { Vehicle } from '../types/vehicle.type';

@Resolver(SeasonTeam)
export class SeasonTeamResolver {
  private _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  @Query(() => [SeasonTeam])
  async seasonTeams(@Args() args: SeasonTeamArgs) {
    return this._prismaService.seasonTeam.findMany({
      where: {
        season: {
          slug: args.seasonSlug,
        },
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

  @ResolveField('vehicle', () => Vehicle)
  async vehicle(@Parent() parent: SeasonTeam) {
    return this._prismaService.vehicle.findFirst({
      where: {
        id: parent.vehicleId,
      },
    });
  }
}
