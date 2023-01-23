import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CommentService,
  FeedService,
  TagService
} from '@conduit/repositories';
@Controller()
export class FeedController {

  constructor(
    private readonly tagService: TagService,
    private readonly feedService: FeedService,
    private readonly commentService: CommentService
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
  handleGetAllArticles(currentUser) {
    return this.feedService.getAll(currentUser);
  }

  @MessagePattern('get_articles_by_author')
  handleGetArticlesByAuthor(payload) {
    return this.feedService.getByAuthor(payload.author, payload.currentUser);
  }

  @MessagePattern('get_articles_by_tag')
  handleGetArticlesByTag(payload) {
    return this.feedService.getByTag(payload.tag, payload.currentUser);
  }

  @MessagePattern('get_article_by_id')
  handleGetArticleByID(payload) {
    return this.feedService.getByID(payload.articleID, payload.currentUser);
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
  handleDeleteArticle(payload) {
    return this.feedService.deleteArticle(payload.id, payload.title);
  }

  @MessagePattern('create_comment')
  handleCreateComment(comment) {
    return this.commentService.createComment(comment);
  }

  @MessagePattern('get_comments_by_article')
  handleGetCommentsByArticle(payload) {
    return this.commentService.getCommentsByArticle(payload);
  }

  @MessagePattern('delete_comment')
  handleDeleteComments(id) {
    return this.commentService.deleteComment(id);
  }

  @MessagePattern('popular_tags')
  handleGetPopularTags() {
    return this.tagService.getPopularTags();
  }
}
