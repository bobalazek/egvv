import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { PrismaService } from '../app/services/prisma.service';

@Module({
  imports: [PassportModule],
  providers: [PrismaService, AuthService, LocalStrategy],
})
export class AuthModule {}
