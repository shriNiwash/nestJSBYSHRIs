import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { json } from 'stream/consumers';
import { Product } from './router.model';

@Injectable()
export class RoutersService {

    constructor(@InjectModel('book') private readonly BookModel:Model<Product>){}

    async getData():Promise<any[]>{
        const data = await this.BookModel.find();
        return data;

    }

    async getInsert(data:object):Promise<object>{
        const insertd = new this.BookModel(data);
        await insertd.save()
        return insertd;

    }

    async getUpdate(id:any,data:object):Promise<object>{
        console.log(data,id);
        const datas = await this.BookModel.findByIdAndUpdate(id,data);
        console.log(datas);
        return datas;
    }

    async getDelete(id:number):Promise<object>{
        await this.BookModel.findByIdAndDelete(id);
        return { id:id,
         message:"deleted"}
    }

    async getInsertData(records:object):Promise<object>{
        const data = new this.BookModel(records);
        await data.save();
        return data;
        
    }

    async getDetails():Promise<object>{
        const data = await this.BookModel.find();
        return data;
    }

    async getFetch(_id:any):Promise<object>{
        console.log(await this.BookModel.findById(_id));
        return await this.BookModel.findById(_id);
    }

    async getUpdata_data(id:string, data:object):Promise<object>{
        const datas = await this.BookModel.findByIdAndUpdate(id,data);
        return datas;
    }

    async getDeleteService(id:string):Promise<object>{
        const data = await this.BookModel.findByIdAndDelete(id);
        return {
            id:id,
            message:"The data is deleted"
        }
    }

}
