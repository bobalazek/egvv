import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

import { ASSETS_DIRECTORY } from '../../constants';

@Controller('assets')
export class AssetsController {
  @Get(':path(*)')
  get(@Param('path') path: string): StreamableFile {
    const pathSplit = path.split('/');
    if (pathSplit.includes('..')) {
      throw new Error('You are not allowed to use double dots.');
    }

    const VEHICLE_BODY_PATH = join(ASSETS_DIRECTORY, ...pathSplit);
    if (!existsSync(VEHICLE_BODY_PATH)) {
      throw new Error('This vehicle does not exist.');
    }

    const file = createReadStream(VEHICLE_BODY_PATH);

    return new StreamableFile(file);
  }
}
