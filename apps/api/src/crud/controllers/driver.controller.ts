import { Controller, Get, Query } from '@nestjs/common';

import { DriverService } from '../services/driver.service';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    const matches = await this.driverService.findMany({ crudQuery });
    return matches;
  }
}
