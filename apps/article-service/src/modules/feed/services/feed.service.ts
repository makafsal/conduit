import { Injectable, Logger } from '@nestjs/common';
import { FeedRepository } from '../repositories/feed.repository';
import { FavoriteService } from './favorite.service';
import { TagService } from './tag.service';
import { UserService } from './user.service';

const logger = new Logger();
@Injectable()
export class FeedService {

  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly tagService: TagService,
    private readonly userService: UserService,
    private readonly favoriteService: FavoriteService
  ) { }

  async createArticle(article) {
    logger.log('ARTICLE-SERVICE: Create article triggered');

    const article_exist = await (await this.feedRepository.getByTitle(article.title)).first();

    if (article_exist) {
      logger.log('ARTICLE-SERVICE: Article title already exists');

      return;
    }

    await this.feedRepository.create(article);

    if (article?.tags) {
      this.tagService.insertTags(article.tags)
    }

    logger.log('ARTICLE-SERVICE: Article created');
    return article;
  }

  async updateArticle(article) {
    logger.log('ARTICLE-SERVICE: Update article triggered');

    const article_exists = await (await this.feedRepository.getByTitle(article.title)).first();

    if (article_exists) {
      await this.feedRepository.updateArticle(article);

      this.tagService.compareAndActOnTags(article.tags, article_exists?.tags);

      return article;
    }

    return;
  }

  async getAll() {
    logger.log('ARTICLE-SERVICE: Get all article triggered');

    const articles = await this.feedRepository.getAll();
    const users = await this.userService.getAllUsers();

    const updated_articles = articles.map((article) => {
      const user = users.find(_user => _user.email === article.author);

      return {
        ...article,
        author: {
          username: user.username,
          email: user.email,
          bio: user.bio,
          image: user.image
        }
      };
    });

    return updated_articles;
  }

  async getByAuthor(email) {
    logger.log('ARTICLE-SERVICE: Get articles by author triggered');

    const user = await this.userService.getUserByEmail(email);
    const articles = await this.feedRepository.getByAuthor(email);

    const updated_articles = articles.map(article => ({
      ...article,
      author: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        image: user.image
      }
    }));

    return updated_articles;
  }

  favoriteArticle(payload) {
    return this.favoriteService.create(payload);
  }

  unfavoriteArticle(payload) {
    return this.favoriteService.remove(payload);
  }

  async deleteArticle(title) {
    await this.feedRepository.delete({ title });

    return true;
  }
}
