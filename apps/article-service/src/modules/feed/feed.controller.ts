import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FeedService } from './feed.service';

const logger = new Logger();
@Controller()
export class FeedController {

  constructor(
    private feedService: FeedService
  ) { }

  @MessagePattern('create_article')
  handleCreateArticle(article) {
    logger.log('ARTICLE-SERVICE: Create article');

    return this.feedService.createArticle(article);
  }
}
