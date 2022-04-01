import { Module } from '@nestjs/common';
import { PrismaCrudModule } from 'nestjs-prisma-crud';

import { PrismaService } from '../app/services/prisma.service';
import { DriversController } from './controllers/drivers.controller';
import { DriversService } from './services/drivers.service';

@Module({
  imports: [
    PrismaCrudModule.register({
      prismaService: PrismaService,
    }),
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class CrudModule {}
