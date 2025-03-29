import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/services/user.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signup(dto: AuthCredentialDto) {
    const { email, password } = dto;
    const user = await this.userService.create({ email, password });
    return user;
  }

  async login(dto: AuthCredentialDto) {
    const { email, password } = dto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    const payload = {
      email: user.email,
      sub: user.id,
    };
    const accessToken = await this.getToken(payload, {
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
    });
    return { accessToken, user };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.findByEmail(payload.email);
      if (!user) {
        return null;
      }
      const newPayload = { email: user.email, sub: user.id };
      const accessToken = await this.getToken(newPayload, {
        expiresIn: this.configService.get<string>(
          'JWT_ACCESS_TOKEN_EXPIRATION',
        ),
      });
      return accessToken;
    } catch (err) {
      return null;
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private async getToken(payload: any, options?: JwtSignOptions) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      ...options,
    });
  }
}
