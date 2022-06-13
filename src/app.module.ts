import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from './modules/router/router.module';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    RouterModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://shriNiwash:Mriphone12345@cluster0.waox8.mongodb.net/MERN_SHRI?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService, AppService],
})
export class AppModule {}
