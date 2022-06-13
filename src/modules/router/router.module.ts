import { Module } from '@nestjs/common';
import {RouterController} from './router.controller';
import {RoutersService} from './routers.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookschema } from './router.model';


@Module({
    imports: [AuthModule,MongooseModule.forFeature([{name:'book',schema:Bookschema}])],
    controllers: [RouterController],
    providers: [RoutersService],
    exports:[RoutersService]

})
export class RouterModule {}
