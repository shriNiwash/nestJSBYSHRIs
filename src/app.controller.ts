import { Body, Controller, Get ,Render,UseGuards,Post, Redirect, Res, BadRequestException,Req} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Response,Request } from 'express';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly userService:AuthService){}

  @Get('/login')
  @ApiExcludeEndpoint()
  @Render('login')
  dataCol(){
    return{
    data:"stylesheets/new.css"
    }
  }

  @Post('/login')
  @ApiExcludeEndpoint()
 async rootdata(@Body() records:any ,@Res() res:Response):Promise<any>{
    const data= await this.userService.validateUser(records.username,records.password);
    if(data == null){
      throw new BadRequestException('invalid credentials')
    }
    else{
       res.redirect('/list')
    }
    
  }
 


  @Get('/home')
  @ApiExcludeEndpoint()
  @Render('index')
  root(){

  }
 
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @ApiExcludeEndpoint()
  async login(@Req() req:Request) {
    return this.userService.login(req.user);
  }

}
