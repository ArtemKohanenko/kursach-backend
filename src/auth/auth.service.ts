import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UserService) {}

  async signIn(
      name: string,
      pass: string,
    ): Promise<{ access_token: string }> {
      const user = await this.usersService.findOneByName(name);
      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.name };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  
  async getCurrentProfile(req): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.usersService.findOneById(req.user.sub);
    delete user.password;
    return user;
  }
}
