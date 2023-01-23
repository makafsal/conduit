import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserService } from '../../auth/services/user.service';
import { FollowerService } from '../../profile/services/follower.service';
import { FeedRepository } from '../feed.repository';
import { FavoriteService } from './favorite.service';
import { TagService } from './tag.service';

const logger = new Logger();
@Injectable()
export class FeedService {

  constructor(
    private readonly feedRepository: FeedRepository,
    private readonly tagService: TagService,
    private readonly userService: UserService,
    private readonly favoriteService: FavoriteService,
    private readonly followerService: FollowerService
  ) { }

  async createArticle(article) {
    logger.log('ARTICLE-SERVICE: Create article triggered');

    const articles = await this.feedRepository.getAll();
    const article_exist = articles.find(_article => _article?.title?.toLocaleLowerCase() === article?.title?.toLocaleLowerCase());

    if (article_exist) {
      logger.log('ARTICLE-SERVICE: Article title already exists');

      return;
    }

    const uuid = randomUUID();
    const slug = `${article.slug}_${uuid}`;
    const newArticle = {
      id: uuid,
      ...article
    };
    newArticle.slug = slug;

    await this.feedRepository.create(newArticle);

    if (article?.tags) {
      this.tagService.insertTags(article.tags)
    }

    logger.log('ARTICLE-SERVICE: Article created');

    const user = await this.userService.getUserByEmail(article?.author);

    newArticle.author = {
      username: user.username,
      email: user.email,
      bio: user.bio,
      image: user.image
    };

    return newArticle;
  }

  async updateArticle(article) {
    logger.log('ARTICLE-SERVICE: Update article triggered');

    const article_exists: any = await this.feedRepository.getByID(article.id);
    console.log(article_exists)

    if (article_exists) {
      article.created_at = article_exists.createdAt;
      article.author = article_exists.author;
      article.slug = `${article.slug}_${article.id}`

      await this.feedRepository.updateArticle(article);

      this.tagService.compareAndActOnTags(article.tags, article_exists?.tags);

      const updated = await this.feedRepository.getByID(article.id);
      const user = await this.userService.getUserByEmail(article.author);

      const updatedArticle = {
        ...updated,
        author: {
          username: user.username,
          email: user.email,
          bio: user.bio,
          image: user.image,
          following: false
        }
      }

      return updatedArticle;
    }

    return;
  }

  async getAll(currentUser) {
    logger.log('ARTICLE-SERVICE: Get all article triggered');

    const articles = await this.feedRepository.getAll();
    const users = await this.userService.getAll();
    const favorites = await this.favoriteService.getAll();
    const followers = await this.followerService.getAll();

    const updated_articles = articles.map((article) => {
      const user = users.find(_user => _user.email === article.author);
      const articleFavorites = favorites.filter(favorite => favorite.article === article.title);
      const favorited = favorites.find(favorite => favorite.article === article.title && favorite.favoritedBy === currentUser);
      const authorFollowers = followers.filter((entry: any) => entry.followedProfile === user.email);
      const following = authorFollowers.find((follower: any) => follower.followedBy === currentUser);

      return {
        ...article,
        favoriteCount: articleFavorites?.length || 0,
        favorited: favorited ? true : false,
        author: {
          username: user.username,
          email: user.email,
          bio: user.bio,
          image: user.image,
          following: following ? true : false
        }
      };
    });

    return updated_articles;
  }

  async getByTag(tag, currentUser) {
    logger.log('ARTICLE-SERVICE: Get articles by tag triggered');

    const articles = await this.feedRepository.getAll();
    const users = await this.userService.getAll();
    const favorites = await this.favoriteService.getAll();
    const followers = await this.followerService.getAll();
    const tagArticles = [];

    articles.forEach(article => {
      const tags = article?.tags?.split(',');
      const isFound = tags.find(tagItem => tagItem.trim().toLocaleLowerCase() === tag.trim().toLocaleLowerCase());

      if (isFound) {
        const articleFavorites = favorites.filter(favorite => favorite.article === article.title);
        const favorited = favorites.find(favorite => favorite.article === article.title && favorite.favoritedBy === currentUser);
        const user = users.find(_user => _user.email === article.author);
        const authorFollowers = followers.filter((entry: any) => entry.followedProfile === user.email);
        const following = authorFollowers.find((follower: any) => follower.followedBy === currentUser);

        const updatedArticle = {
          ...article,
          favoriteCount: articleFavorites?.length || 0,
          favorited: favorited ? true : false,
          author: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            image: user.image,
            following: following ? true : false
          }
        };

        tagArticles.push(updatedArticle);
      }
    });

    return tagArticles;
  }

  async getUserFavorited(payload) {
    const favorites = await this.favoriteService.getAll();
    const userFavorites = await this.favoriteService.getByFavoritedUser(payload.favoritedUser);
    const articles = await this.feedRepository.getAll();
    const users = await this.userService.getAll();
    const followers = await this.followerService.getAll();

    const favoritedArticles = [];

    userFavorites.forEach((favoriteEntry) => {
      const articleEntry = articles.find(article => article.title === favoriteEntry.article);

      if (articleEntry) {
        const articleFavorites = favorites.filter(favorite => favorite.article === articleEntry.title);
        const user = users.find(_user => _user.email === articleEntry.author);
        const authorFollowers = followers.filter((entry: any) => entry.followedProfile === user.email);
        const following = authorFollowers.find((follower: any) => follower.followedBy === payload.currentUser);

        const updatedArticle = {
          ...articleEntry,
          favoriteCount: articleFavorites?.length || 0,
          favorited: true,
          author: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            image: user.image,
            following: following ? true : false
          }
        }

        favoritedArticles.push(updatedArticle);
      }
    });

    return favoritedArticles;
  }

  async getByAuthor(author, currentUser) {
    logger.log('ARTICLE-SERVICE: Get articles by author triggered');

    const user = await this.userService.getUserByEmail(author);
    const articles = await this.feedRepository.getByAuthor(author);
    const favorites = await this.favoriteService.getAll();
    const followers = await this.followerService.getFollowers(author);

    const updated_articles = articles.map(article => {
      const articleFavorites = favorites.filter(favorite => favorite.article === article.title);
      const favorited = favorites.find(favorite => favorite.article === article.title && favorite.favoritedBy === currentUser);
      const following = followers.find(follower => follower.followed_by === currentUser);

      return {
        ...article,
        createdAt: article.created_at,
        updatedAt: article.updated_at,
        favoriteCount: articleFavorites?.length || 0,
        favorited: favorited ? true : false,
        author: {
          username: user.username,
          email: user.email,
          bio: user.bio,
          image: user.image,
          following: following ? true : false
        }
      }
    });

    return updated_articles;
  }

  async getByID(id, currentUser) {
    logger.log('ARTICLE-SERVICE: Get article by ID triggered');

    const article = await this.feedRepository.getByID(id);

    if (article) {
      const followers = await this.followerService.getFollowers(article.author);
      const user = await this.userService.getUserByEmail(article?.author);
      const following = followers.find(follower => follower.followed_by === currentUser);

      const updated_article = {
        ...article,
        author: {
          username: user.username,
          email: user.email,
          bio: user.bio,
          image: user.image,
          following: following ? true : false
        }
      }

      if (article.author !== currentUser) {
        const favorites = await this.favoriteService.getAll();
        const articleFavorites = favorites.filter(favorite => favorite.article === article.title);
        const favorited = favorites.find(favorite => favorite.article === article.title && favorite.favoritedBy === currentUser);

        return {
          ...updated_article,
          favoriteCount: articleFavorites?.length || 0,
          favorited: favorited ? true : false
        }
      }

      return updated_article;
    }

    logger.log('ARTICLE-SERVICE: Article not found');

    return;
  }

  favoriteArticle(payload) {
    return this.favoriteService.create(payload);
  }

  unfavoriteArticle(payload) {
    return this.favoriteService.remove(payload);
  }

  async deleteArticle(id, title) {
    return this.feedRepository.delete(id, title);
  }
}
