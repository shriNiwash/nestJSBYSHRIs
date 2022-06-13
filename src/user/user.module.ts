import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { userController } from './user.controller';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports:[MongooseModule.forFeature([{name:'userData',schema:UserSchema}])],
  controllers:[userController]
})
export class UsersModule {}