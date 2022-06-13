import { IsString,IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class loginDto{
    @ApiProperty()
    @IsString()
    username:string;

    @ApiProperty()
    @IsString()
    password:string;  

}

export class userId{
    @ApiProperty()
    @IsString()
    _id:string
    required:true;
}

export class bookData{
    @ApiProperty()
    @IsString()
    name:string;

    @ApiProperty()
    @IsNumber()
    sold:number;
}