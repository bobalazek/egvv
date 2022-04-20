import { Injectable } from '@nestjs/common';
import { Season, SeasonTeam, Series, Team } from '@prisma/client';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { API_SERVER_URL } from '@egvv/shared-constants';
import { ASSETS_SERIES_DIRECTORY } from '../../constants';
import { SeasonTyreAsset } from '../models/assets/season-tyre-asset.model';
import { TeamVehicleAsset } from '../models/assets/team-vehicle-asset.model';

@Injectable()
export class AssetsService {
  getSeasonTyreAssets(season: Season & { series: Series }) {
    const assets: SeasonTyreAsset[] = [];

    const SEASON_DIRECTORY = join(ASSETS_SERIES_DIRECTORY, season.series.slug, season.slug);
    const TYRES_JSON_PATH = join(SEASON_DIRECTORY, 'tyres.json');
    if (!existsSync(TYRES_JSON_PATH)) {
      throw new Error(`Tyres not found for season ${season.slug}.`);
    }

    const tyresRawData = readFileSync(TYRES_JSON_PATH);
    const tyresData = JSON.parse(tyresRawData.toString());

    for (const tyreData of tyresData) {
      for (const type of ['front', 'rear']) {
        const url = `${API_SERVER_URL}/assets/series/${season.series.slug}/${season.slug}/tyres/${tyreData.key}/${type}-tyre.glb`;

        assets.push({
          url,
          key: tyreData.key,
          type,
          name: tyreData.name,
          seasonId: season.id,
        });
      }
    }

    return assets;
  }

  getTeamVehicleAssets(seasonTeams: (SeasonTeam & { season: Season & { series: Series }; team: Team })[]) {
    const assets: TeamVehicleAsset[] = [];
    for (const seasonTeam of seasonTeams) {
      const SEASON_DIRECTORY = join(ASSETS_SERIES_DIRECTORY, seasonTeam.season.series.slug, seasonTeam.season.slug);
      const SEASON_TEAMS_DIRECTORY = join(SEASON_DIRECTORY, 'teams');
      const VEHICLES_JSON_PATH = join(SEASON_TEAMS_DIRECTORY, seasonTeam.team.slug, 'vehicles.json');
      if (!existsSync(VEHICLES_JSON_PATH)) {
        continue;
      }

      const vehiclesRawData = readFileSync(VEHICLES_JSON_PATH);
      const vehiclesData = JSON.parse(vehiclesRawData.toString());

      for (const vehicleData of vehiclesData) {
        const url =
          `${API_SERVER_URL}/assets/series/{seriesSlug}/{seasonSlug}/teams/{teamSlug}/vehicles/{vehicleKey}/vehicle-body.glb`
            .replace('{seriesSlug}', seasonTeam.season.series.slug)
            .replace('{seasonSlug}', seasonTeam.season.slug)
            .replace('{teamSlug}', seasonTeam.team.slug)
            .replace('{vehicleKey}', vehicleData.key);

        assets.push({
          url,
          key: vehicleData.key,
          name: vehicleData.name,
          seasonTeamId: seasonTeam.id,
        });
      }
    }

    return assets;
  }
}
