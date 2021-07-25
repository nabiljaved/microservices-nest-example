import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://xlwalaqb:9APxbdn2DKUMxNCyGrcScP2Z7GAv8I2i@elk.rmq2.cloudamqp.com/xlwalaqb'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}