import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';

import { PrismaService } from '../../app/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async validateUser(username: string, password: string): Promise<User> {
    // TODO: hash it (duh!)

    const user = await this.prismaService.user.findFirst({
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
}
