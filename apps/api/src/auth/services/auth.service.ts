import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../../app/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(private _prismaService: PrismaService, private _jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User> {
    // TODO: hash it (duh!)

    const user = await this._prismaService.user.findFirst({
      where: {
        username,
      },
    });
    if (!user || user.password !== password) {
      return null;
    }

    const { password: _password, roles, ...result } = user;

    return {
      ...result,
      roles: roles as string[],
    };
  }

  async login(user: { id: string; username: string }) {
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}
