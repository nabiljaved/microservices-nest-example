import { Controller, Get, HttpService, Param, Post} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {


    constructor(private productService:ProductService, private httpService: HttpService){}

    @Get()
    async all(){
        return this.productService.all() 
    }
    
    @Post(':id/likes')
    async like(@Param('id') id:number){
        const product = await this.productService.findOne(id);

         this.httpService.post(`http://localhost:8000/api/products/${id}/likes`, {}).subscribe(res => {
            //console.log(res)
        })

        return this.productService.update(id, {likes: product.likes +1})
    }

    @EventPattern('hello')
    async helloworld(data:string){
        console.log(data)
    }

    @EventPattern('product_created')
    async productCreated(product:any){
        this.productService.create({
            title : product.title,
            image : product.image,
            id:product.id,
            likes:product.likes
        })
    }
    
    @EventPattern('product_updated')
    async productUpdated(product:any){
        this.productService.update(product.id,{
            title : product.title,
            image : product.image,
            id:product.id,
            likes:product.likes
        })
    }

    @EventPattern('product_deleted')
    async productDeleted(id:number){
        await this.productService.delete(id)
    }
}
