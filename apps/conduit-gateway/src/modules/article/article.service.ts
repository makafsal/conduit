import { BadRequestException, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { map } from 'rxjs';
import { CreateArticleInput } from '../../shared/types/article/input/create-article.input';
import { UpdateArticleInput } from '../../shared/types/article/input/update-article.input';

const logger = new Logger();
@Injectable()
export class ArticleService implements OnModuleInit {

  constructor(
    @Inject('ARTICLE-SERVICE') private readonly articleClient: ClientKafka
  ) { }

  onModuleInit() {
    this.articleClient.subscribeToResponseOf('create_article');
    this.articleClient.subscribeToResponseOf('update_article');
    this.articleClient.subscribeToResponseOf('get_all_articles');
    this.articleClient.subscribeToResponseOf('get_articles_by_author');
  }

  create(article: CreateArticleInput) {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('create_article', article).pipe(
      map(newArticle => {
        if (!newArticle) {
          logger.log('GATEWAY - Article creation failed');

          throw new BadRequestException('Title already exists');
        }

        logger.log('GATEWAY - Article created successfully');
        return newArticle;
      })
    );
  }

  update(article: UpdateArticleInput) {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('update_article', article).pipe(
      map(updatedArticle => {
        if (!updatedArticle) {
          logger.log('GATEWAY - Article not found');

          return new RpcException('Article not found');
        }

        logger.log('GATEWAY - Article updated successfully');
        return updatedArticle;
      })
    )
  }

  getAll() {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('get_all_articles', {}).pipe(
      map(articles => articles)
    );
  }

  getByAuthor(email: string) {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('get_articles_by_author', { email }).pipe(
      map(articles => articles)
    );
  }
}
