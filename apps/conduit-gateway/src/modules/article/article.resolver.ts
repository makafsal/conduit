import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLAuthGuard } from '../../shared/jwt/jwt-auth.guard';
import { Article } from '../../shared/types/article/article.dto';
import { CreateArticleInput } from '../../shared/types/article/input/create-article.input';
import { FavoriteArticleInput } from '../../shared/types/article/input/favorite-article.input';
import { UpdateArticleInput } from '../../shared/types/article/input/update-article.input';
import { CreateArticleOutput } from '../../shared/types/article/output/create-article.output';
import { UpdateArticleOutput } from '../../shared/types/article/output/update-article.output';
import { ArticleService } from './article.service';

@Resolver()
export class ArticleResolver {

  constructor(
    private readonly articleService: ArticleService
  ) { }

  @Mutation(() => CreateArticleOutput)
  @UseGuards(GraphQLAuthGuard)
  createArticle(@Args('article') article: CreateArticleInput) {
    return this.articleService.create(article);
  }

  @Mutation(() => UpdateArticleOutput)
  @UseGuards(GraphQLAuthGuard)
  updateArticle(@Args('article') article: UpdateArticleInput) {
    return this.articleService.update(article);
  }

  @Query(() => [Article])
  @UseGuards(GraphQLAuthGuard)
  getAllArticles() {
    return this.articleService.getAll();
  }

  @Query(() => [Article])
  @UseGuards(GraphQLAuthGuard)
  getArticlesByAuthor(@Args('author_email') author_email: string) {
    return this.articleService.getByAuthor(author_email);
  }

  @Mutation(() => String)
  @UseGuards(GraphQLAuthGuard)
  favoriteArticle(@Args('favoriteArgs') favoriteArgs: FavoriteArticleInput) {
    return this.articleService.favoriteArticle(favoriteArgs);
  }

  @Mutation(() => String)
  @UseGuards(GraphQLAuthGuard)
  unfavoriteArticle(@Args('unfavoriteArgs') unfavoriteArgs: FavoriteArticleInput) {
    return this.articleService.unfavoriteArticle(unfavoriteArgs);
  }

  @Mutation(() => String)
  @UseGuards(GraphQLAuthGuard)
  deleteArticle(@Args('title') title: string) {
    return this.articleService.deleteArticle(title);
  }
}
