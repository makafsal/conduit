import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FeedService } from './services/feed.service';
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

  @MessagePattern('get_all_articles')
  handleGetAllArticles() {
    return this.feedService.getAll();
  }

  @MessagePattern('get_articles_by_author')
  handleGetArticlesByAuthor(email: string) {
    return this.feedService.getByAuthor(email);
  }

  @MessagePattern('favorite_article')
  handleFavoriteArticle(payload) {
    return this.feedService.favoriteArticle(payload);
  }

  @MessagePattern('unfavorite_article')
  handleUnfavoriteArticle(payload) {
    return this.feedService.unfavoriteArticle(payload);
  }

  @MessagePattern('delete_article')
  handleDeleteArticle(title) {
    return this.feedService.deleteArticle(title);
  }
}
