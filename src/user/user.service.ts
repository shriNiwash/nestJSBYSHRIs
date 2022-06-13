import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from './user.model';

export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel('userData') private readonly UserModel:Model<user>){}
  private readonly users = [
    {
      userId: 1,
      username: 'shri',
      password: 'admin',
    },
    {
      userId: 2,
      username: 'shri2',
      password: 'admin',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    // return this.users.find(user => user.username === username);
    console.log(await this.UserModel.findOne({username:username}));
    return await this.UserModel.findOne({username:username});
  }

  async registerData(data:object):Promise<object>{
    const record = new this.UserModel(data);
    return await record.save();
  }
}