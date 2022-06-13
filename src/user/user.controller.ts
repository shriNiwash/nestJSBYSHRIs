import { Body, Controller, Get, Post, Redirect, Render } from "@nestjs/common";
import { UsersService } from "./user.service";
import { ApiExcludeEndpoint,ApiBody, ApiCreatedResponse ,ApiTags} from "@nestjs/swagger";
import { loginDto } from "src/modules/model.swagger";



@Controller()
@ApiTags('User-registration')
export class userController {
    constructor(private readonly userService:UsersService ){}

    @Get('/register')
    @ApiExcludeEndpoint()
    @Render('registration')
    registerPage(){}


    @Post('/register')
    @ApiBody({type:loginDto})
    @ApiCreatedResponse({description:'user Registration'})
    @Redirect('/login')
   async useLogin(@Body() record:object):Promise<object>{
       return await this.userService.registerData(record);
    }


}