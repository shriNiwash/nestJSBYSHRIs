import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        allowNull:false,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        allowNull:false,
    }
})

export interface user{
    username:string;
    password:string;
}


