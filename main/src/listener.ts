import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.createMicroservice(AppModule, {

    transport : Transport.RMQ,
    options: {
      urls: ['amqps://xlwalaqb:9APxbdn2DKUMxNCyGrcScP2Z7GAv8I2i@elk.rmq2.cloudamqp.com/xlwalaqb'],
      queue: 'main_queue',
      queueOptions: {
        durable: false
      },
    },
  });

app.listen()  
 
}

bootstrap();
