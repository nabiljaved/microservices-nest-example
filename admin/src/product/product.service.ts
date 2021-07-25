import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private readonly prodcutRepository: Repository<Product>){}

    async all():Promise<Product[]>{
        return this.prodcutRepository.find();
    }

    async create(data):Promise<Product>{
        return this.prodcutRepository.save(data);
    }

    async get(id:number):Promise<Product>{
        return this.prodcutRepository.findOne({id})
    }

    async update(id:number, data):Promise<any>{
        return this.prodcutRepository.update(id, data);    
    }

    async delete(id:number):Promise<any>{
        return this.prodcutRepository.delete(id)
    }

}
