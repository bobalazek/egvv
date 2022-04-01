import { Controller, Get, Query } from '@nestjs/common';

import { DriversService } from '../services/drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.driversService.findMany({ crudQuery });
    return matches;
  }
}
