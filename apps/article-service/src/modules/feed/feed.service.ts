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

    return this.feedRepository.getAll();
  }
}
