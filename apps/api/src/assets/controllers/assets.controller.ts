import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { ASSETS_SERIES_DIRECTORY } from '../../constants';

@Controller('assets')
export class AssetsController {
  @Get('team-vehicles/:seriesSlug/:seasonSlug/:teamSlug/:key/vehicle-body.glb')
  teamVehicles(
    @Param('seriesSlug') seriesSlug: string,
    @Param('seasonSlug') seasonSlug: string,
    @Param('teamSlug') teamSlug: string,
    @Param('key') key: string
  ): StreamableFile {
    const VEHICLE_BODY_PATH = join(
      ASSETS_SERIES_DIRECTORY,
      seriesSlug,
      seasonSlug,
      'teams',
      teamSlug,
      'vehicles',
      key,
      'vehicle-body.glb'
    );
    if (!existsSync(VEHICLE_BODY_PATH)) {
      throw new Error('This vehicle does not exist.');
    }

    const file = createReadStream(VEHICLE_BODY_PATH);

    return new StreamableFile(file);
  }
}
