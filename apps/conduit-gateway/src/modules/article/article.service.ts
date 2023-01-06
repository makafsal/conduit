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
    this.articleClient.subscribeToResponseOf('favorite_article');
    this.articleClient.subscribeToResponseOf('unfavorite_article');
    this.articleClient.subscribeToResponseOf('delete_article');
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

  getAll(currentUser: string) {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('get_all_articles', currentUser)
      .pipe(map(articles => {
        logger.log('GATEWAY - Articles retrieved');

        return articles;
      }));
  }

  getByAuthor(author: string, currentUser: string) {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('get_articles_by_author', { author, currentUser }).pipe(
      map(articles => articles)
    );
  }

  favoriteArticle(favoriteArgs) {
    logger.log('GATEWAY - Calling Article Service Favorite Method');

    return this.articleClient.send('favorite_article', favoriteArgs);
  }

  unfavoriteArticle(unfavoriteArgs) {
    logger.log('GATEWAY - Calling Article Service Unfavorite Method');

    return this.articleClient.send('unfavorite_article', unfavoriteArgs);
  }

  deleteArticle(title) {
    logger.log('GATEWAY - Calling Article Service Delete Method');

    return this.articleClient.send('delete_article', title);
  }

}
