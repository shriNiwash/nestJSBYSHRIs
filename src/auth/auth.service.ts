import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private readonly JwtService:JwtService,
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log(username,pass);
    const user = await this.usersService.findOne(username);
    console.log('sweta'+user);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log("shri"+user);
      console.log(result._doc.role);
      return result;
    }
    return null;
  }

  async login(payload: any) {
    return this.JwtService.sign(payload);
  }
}

