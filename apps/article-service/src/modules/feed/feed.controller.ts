import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FeedService } from './feed.service';
@Controller()
export class FeedController {

  constructor(
    private feedService: FeedService
  ) { }

  @MessagePattern('create_article')
  handleCreateArticle(article) {
    return this.feedService.createArticle(article);
  }

  @MessagePattern('update_article')
  handleUpdateArticle(article) {
    return this.feedService.updateArticle(article);
  }
}
