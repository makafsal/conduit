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
    this.articleClient.subscribeToResponseOf('get_article_by_id');
    this.articleClient.subscribeToResponseOf('create_comment');
    this.articleClient.subscribeToResponseOf('get_comments_by_article');
    this.articleClient.subscribeToResponseOf('delete_comment');
    this.articleClient.subscribeToResponseOf('popular_tags');
    this.articleClient.subscribeToResponseOf('get_articles_by_tag');
    this.articleClient.subscribeToResponseOf('get_favorited_articles');
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

  /**
   * 
   * @param payload : {
   *  articleID
   *  currentUser
   *  token
   * }
   */
  getByID(payload) {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('get_article_by_id', payload);
  }

  getByTag(payload) {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('get_articles_by_tag', payload).pipe(
      map(articles => {
        logger.log('GATEWAY - Article by tag retrieved');

        return articles;
      })
    );
  }

  getUserFavorited(payload) {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('get_favorited_articles', payload)
    .pipe(map(articles => {
      logger.log('GATEWAY - Favorited articles retrieved');

      return articles;
    }));
  }

  favoriteArticle(favoriteArgs) {
    logger.log('GATEWAY - Calling Article Service Favorite Method');

    return this.articleClient.send('favorite_article', favoriteArgs);
  }

  unfavoriteArticle(unfavoriteArgs) {
    logger.log('GATEWAY - Calling Article Service Unfavorite Method');

    return this.articleClient.send('unfavorite_article', unfavoriteArgs);
  }

  deleteArticle(payload) {
    logger.log('GATEWAY - Calling Article Service Delete Method');

    return this.articleClient.send('delete_article', payload);
  }

  // Comment Services

  createComment(comment) {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('create_comment', comment);
  }

  getCommentsByArticle(payload) {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('get_comments_by_article', payload).pipe(
      map(comments => comments)
    );
  }

  deleteComment(payload) {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('delete_comment', payload.id);
  }

  // Tag Services

  getPopularTags(payload) {
    logger.log('GATEWAY - Calling Article Service');

    return this.articleClient.send('popular_tags', payload).pipe(
      map(tags => {
        logger.log('GATEWAY - Popular Tags retrieved');

        return tags;
      })
    );
  }
}
