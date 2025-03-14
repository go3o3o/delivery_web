import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { Public } from 'src/libs/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() dto: AuthCredentialDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: AuthCredentialDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    return res.clearCookie('jwt').send({ redirectUrl: '/login' });
  }

  @Post('refresh')
  async refresh(@Body() dto: { refreshToken: string }) {
    return this.authService.refreshToken(dto.refreshToken);
  }
}
