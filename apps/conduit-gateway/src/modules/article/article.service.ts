import { BadRequestException, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { map } from 'rxjs';
import { CreateArticleInput } from '../../shared/types/user/input/create-article.input';

const logger = new Logger();
@Injectable()
export class ArticleService implements OnModuleInit {

  constructor(
    @Inject('ARTICLE-SERVICE') private readonly articleClient: ClientKafka
  ) { }

  onModuleInit() {
    this.articleClient.subscribeToResponseOf('create_article');
  }

  create(article: CreateArticleInput) {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('create_article', article).pipe(
      map(article => {
        if (!article) {
          logger.log('GATEWAY - Article creation failed');

          throw new BadRequestException('Title already exists');
        }

        logger.log('GATEWAY - Article created successfully');
        return article;
      })
    );
  }
}
