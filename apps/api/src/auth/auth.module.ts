import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JWT_SECRET } from '@egvv/shared';
import { AuthService } from './services/auth.service';
import { PrismaService } from '../app/services/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [PrismaService, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
