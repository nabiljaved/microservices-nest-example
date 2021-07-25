import {Param, Body ,Controller, Get, Post, Put, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(private productService:ProductService, @Inject('PRODUCT_SERVICE') private readonly client : ClientProxy){}

    // @Get()
    // all(){
    //     this.client.emit('hello', 'hello from rabbit mq')
    //     return this.productService.all()
    // }

    @Get()
    all(){
        this.client.emit('hello', 'hello from rabbit mq')
        return this.productService.all()
    }

    // @Post()
    // create(@Body() body ){
         
    // }

    @Post()
    async create(@Body('title') title:string, @Body('image') image:string ) {
        
         const product =  await this.productService.create({title, image})
         this.client.emit('product_created', product)
         return product   
    }

    @Get(':id')
    async get(@Param('id') id:number){
         return this.productService.get(id);   
    }

    @Put(':id')
    async update(@Param('id') id:number, @Body('title') title:string, @Body('image') image:string, @Body('likes') likes:number ){
        await this.productService.update(id, {title, image, likes})
        const product = await this.productService.get(id)
        this.client.emit('product_updated', product)
        return product;
    }

    @Delete(':id')
    async delete(@Param('id') id : number):Promise<string>{
        await this.productService.delete(id)
        this.client.emit('product_deleted', id)
        return 'product is deleted'
    }
    
    @Post(':id/likes')
    async like(@Param('id') id:number){
        const product = await this.productService.get(id);
        return this.productService.update(id, {likes: product.likes +1})
    }

}
