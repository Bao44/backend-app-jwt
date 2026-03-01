import { comparePasswordHelper } from '@/helpers/util';
import { UsersService } from './../modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);

    const isValidPassword = await comparePasswordHelper(
      password,
      user?.password || '',
    );

    if (!user || !isValidPassword) return null;

    return user;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Cách 1: không dùng Guard
  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);

    const isValidPassword = await comparePasswordHelper(
      password,
      user?.password || '',
    );

    if (!user || !isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
