import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'article-service',
          brokers: ['localhost:9092']
        },
        consumer: {
          groupId: 'article-service'
        }
      }
    }
  );

  logger.log("Profile-service is listening");
  await app.listen();
}

bootstrap();
