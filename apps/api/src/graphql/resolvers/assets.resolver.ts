import { Resolver, Query, Args } from '@nestjs/graphql';
import { readdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { API_SERVER_URL } from '@egvv/shared-constants';
import { PrismaService } from '../../app/services/prisma.service';
import { TeamVehicleAssetsArgs } from '../args/assets/team-vehicle-assets.args';
import { TeamVehicleAsset } from '../models/assets/team-vehicle-asset.model';
import { AbstractResolver } from './abstract.resolver';
import { ASSETS_SERIES_DIRECTORY } from '../../constants';

@Resolver()
export class AssetsResolver extends AbstractResolver {
  constructor(prismaService: PrismaService) {
    super(prismaService);
  }

  @Query(() => [TeamVehicleAsset])
  async teamVehicleAssets(@Args() args: TeamVehicleAssetsArgs) {
    const season = await this._prismaService.season.findFirst({
      where: {
        slug: args.seasonSlug,
      },
      include: {
        series: true,
      },
    });
    if (!season) {
      throw new Error(`Season "${args.seasonSlug}" not found.`);
    }

    const SEASON_DIRECTORY = join(ASSETS_SERIES_DIRECTORY, season.series.slug, season.slug);
    const SEASON_TEAMS_DIRECTORY = join(SEASON_DIRECTORY, 'teams');

    const teamsDirectories = readdirSync(SEASON_TEAMS_DIRECTORY);

    const seasonTeams = await this._prismaService.seasonTeam.findMany({
      where: {
        season: {
          slug: season.slug,
        },
        team: {
          slug: {
            in: teamsDirectories,
          },
        },
      },
      include: {
        team: true,
        season: true,
      },
    });

    const teamVehicleAssets: TeamVehicleAsset[] = [];
    for (const seasonTeam of seasonTeams) {
      if (args.teamSlug && args.teamSlug !== seasonTeam.team.slug) {
        continue;
      }

      const VEHICLES_JSON_PATH = join(SEASON_TEAMS_DIRECTORY, seasonTeam.team.slug, 'vehicles.json');
      if (!existsSync(VEHICLES_JSON_PATH)) {
        continue;
      }

      const vehiclesRawData = readFileSync(VEHICLES_JSON_PATH);
      const vehiclesData = JSON.parse(vehiclesRawData.toString());

      const vehicleData = vehiclesData[0]; // TODO: that depends on the round

      const url = `${API_SERVER_URL}/assets/team-vehicles/${season.series.slug}/${seasonTeam.season.slug}/${seasonTeam.team.slug}/${vehicleData.key}/vehicle-body.glb`;

      teamVehicleAssets.push({
        url,
        key: vehicleData.key,
        name: vehicleData.name,
        seasonTeamName: seasonTeam.name,
        teamSlug: seasonTeam.team.slug,
        seasonSlug: seasonTeam.season.slug,
      });
    }

    return teamVehicleAssets;
  }
}
