import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ARTICLE-SERVICE',
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
    ])
  ],
  providers: [
    ArticleResolver,
    ArticleService
  ],
})
export class ArticleModule { }
