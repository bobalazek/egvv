import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../../app/services/prisma.service';
import { JwtUserDynamicFieldsInterface } from '../auth/interfaces/jwt-user.interface';

@Injectable()
export class AuthService {
  constructor(private _prismaService: PrismaService, private _jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
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

  async login(user: User) {
    const payload: JwtUserDynamicFieldsInterface = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };

    return {
      token: this._jwtService.sign(payload),
    };
  }
}
