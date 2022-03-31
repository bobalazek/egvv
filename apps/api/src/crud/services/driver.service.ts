import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class DriverService extends PrismaCrudService {
  constructor() {
    super({
      model: 'driver',
      allowedJoins: [],
    });
  }
}
