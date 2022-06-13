import * as mongoose from 'mongoose';
export const Bookschema  =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
        allowNull:false,
    },
    sold:{
        type:Number,
        required:true,
    }
});

export interface Product{
    name:string;
    sold:number;
}