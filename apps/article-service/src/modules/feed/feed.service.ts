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
    
    if(article_exist) {
      logger.log('ARTICLE-SERVICE: Article title already exists');

      return;
    }
    
    await this.feedRepository.create(article);

    logger.log('ARTICLE-SERVICE: Article created');
    return article;
  }
}
