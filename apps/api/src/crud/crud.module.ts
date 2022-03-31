import { Module } from '@nestjs/common';

import { DriverController } from './controllers/driver.controller';

@Module({
  imports: [],
  controllers: [DriverController],
})
export class CrudModule {}
