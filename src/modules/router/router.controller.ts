import { Body, Controller, Delete, Get, Param, Post, Put, Redirect, Render,Req,Res ,UseGuards} from '@nestjs/common';
import {RoutersService} from './routers.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Request,Response } from 'express';
import { loginDto,userId,bookData } from '../model.swagger';
import { CONSTANTS } from 'src/auth/constants';
import { RoleGuard } from 'src/auth/roleGuard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse,ApiExcludeEndpoint,ApiSecurity, ApiBody,ApiTags } from '@nestjs/swagger';
import { json } from 'stream/consumers';

@Controller()
@ApiTags('Book-inventory and login')
export class RouterController {
    constructor(private readonly appService:RoutersService,
        private readonly authservice:AuthService,
        ){}

    //CRUD API
    @Get()
    @ApiExcludeEndpoint() 
    @Render('home')
    getRespond(){}
    
    @UseGuards(AuthGuard('local'))
    @Post('/login-user')
    @ApiCreatedResponse({description:'User login'})
    @ApiOkResponse({description:'user-login'})
    @ApiBody({type:loginDto})
    async getLogin(@Req() req:Request):Promise<string>{
        return await this.authservice.login(req.user);
    }

    @Get('/list-data')
    @UseGuards(AuthGuard('jwt'))
    @ApiCreatedResponse({description:'User login'})
    @ApiOkResponse({description:'user-login'})
    @ApiSecurity('access-token')
    getList():Promise<any>{
        return this.appService.getData();

    }
    @Post('/insert-data')
    @UseGuards(AuthGuard('jwt'))
    @ApiCreatedResponse({description:'Book_inventory'})
    @ApiOkResponse({description:'Book insertion'})
    @ApiSecurity('access-token')
    @ApiBody({type:bookData})
    insertData(@Body() record:object):Promise<object>{
        return this.appService.getInsert(record);
    }

    @Get('/list-data/:_id')
    @UseGuards(AuthGuard('jwt'),new RoleGuard(CONSTANTS.ROLES.admin))
    @ApiCreatedResponse({description:'User login'})
    @ApiOkResponse({description:'user-login'})
    @ApiBody({type:userId})
    @ApiSecurity('access-token')
    findby(@Param() ids:string):Promise<object>{
        return this.appService.getFetch(ids);
    }

    @Put('/update/:_id')
    @UseGuards(AuthGuard('jwt'),new RoleGuard(CONSTANTS.ROLES.admin))
    @ApiCreatedResponse({description:'User login'})
    @ApiOkResponse({description:'user-login'})
    @ApiBody({type:userId})
    @ApiSecurity('access-token')
    async update_book(@Param() id:string, @Body() records:object):Promise<object>{
        console.log(records,id);
        return await this.appService.getUpdate(id,records);
    }

    @Delete('/delete/:_id')
    @UseGuards(AuthGuard('jwt'),new RoleGuard(CONSTANTS.ROLES.admin))
    @ApiCreatedResponse({description:'User login'})
    @ApiOkResponse({description:'user-login'})
    @ApiSecurity('access-token')
    @ApiBody({type:userId})
    delete_book(@Param() id:number):Promise<object>{
        return this.appService.getDelete(id);
    }

    @Get('/admin')
    @UseGuards(AuthGuard('jwt'),new RoleGuard(CONSTANTS.ROLES.admin))
    @ApiCreatedResponse({description:'User login'})
    @ApiOkResponse({description:'user-login'})
    @ApiSecurity('access-token')
    getAdmin():string{
        return "This is the admin pannel";
    }

    @Get('/user')
    @UseGuards(AuthGuard('jwt'),new RoleGuard(CONSTANTS.ROLES.user))
    getUser(@Req() req:Request):string{
        return "This is the user pannel"+JSON.stringify(req.user);
    }

    //Book_inventory API
    // @UseGuards(AuthGuard('local'))
    @Get('/insert')
    @ApiExcludeEndpoint() 
    @Render('Insert')
    root(){}

    @Get('/list')
    @ApiExcludeEndpoint()
    @Render('datalist')
    async rootData(){
        const data  =await this.appService.getDetails();
        return{ list : data }

    }

    @Get('/list/edit/:_id')
    @ApiExcludeEndpoint()
    // @UseGuards(AuthGuard('local'))
    @Render('update')
    async update_data(@Param() id:string){
        console.log(id);
        const data = await this.appService.getFetch(id);
        return{ list:data }  
    }

    @Post('/list/edit/:_id')
    @ApiExcludeEndpoint()
    @Redirect('/list')
    async database_data(@Param() id:string , @Body() records:object):Promise<object>{
        return await this.appService.getUpdata_data(id,records)
    }

    @Get('/list/delete/:_id')
    @ApiExcludeEndpoint()
    @Redirect('/list')
    async dataBase_delete(@Param() id:string):Promise<any>{
        return await this.appService.getDeleteService(id);
    }

    @Post('/insert')
    @ApiExcludeEndpoint()
    @Redirect('/list')
    dataBooks(@Res() res:Response, @Body() data:object):Promise<object>{
        return this.appService.getInsertData(data);
    }




}
