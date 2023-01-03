import { Injectable, Logger } from '@nestjs/common';
import { FeedRepository } from './feed.repository';

const logger = new Logger();
@Injectable()
export class FeedService {

  constructor(
    private readonly feedRepository: FeedRepository
  ) { }

  async createArticle(article) {
    logger.log('ARTICLE-SERVICE: Create article triggered');

    const article_exist = await (await this.feedRepository.getByTitle(article.title)).first();

    if (article_exist) {
      logger.log('ARTICLE-SERVICE: Article title already exists');

      return;
    }

    await this.feedRepository.create(article);

    logger.log('ARTICLE-SERVICE: Article created');
    return article;
  }

  async updateArticle(article) {
    logger.log('ARTICLE-SERVICE: Update article triggered');

    const article_exists = await (await this.feedRepository.getByTitle(article.title)).first();

    if (article_exists) {
      await this.feedRepository.updateArticle(article);
      return article;
    }

    return;
  }

  getAll() {
    logger.log('ARTICLE-SERVICE: Get all article triggered');
    // TODO: Include author details from users table in the response
    // Call auth-service to fetch user by email and attach it to the response

    return this.feedRepository.getAll();
  }

  getByAuthor(payload) {
    logger.log('ARTICLE-SERVICE: Get articles by author triggered');
    // TODO: Include author details from users table in the response
    // Call auth-service to fetch user by email and attach it to the response

    return this.feedRepository.getByAuthor(payload.email);
  }
}
