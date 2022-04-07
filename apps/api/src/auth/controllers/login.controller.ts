import { Controller, Request, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AuthService } from '../../auth/services/auth.service';

@Controller()
export class LoginController {
  constructor(private _authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this._authService.login(req.user);
  }
}
