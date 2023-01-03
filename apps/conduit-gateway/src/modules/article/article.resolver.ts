import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLAuthGuard } from '../../shared/jwt/jwt-auth.guard';
import { Article } from '../../shared/types/article/article.dto';
import { CreateArticleInput } from '../../shared/types/article/input/create-article.input';
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

  // TODO: get all articles (aka global feeds)

  @Query(() => [Article])
  @UseGuards(GraphQLAuthGuard)
  getAllArticles() {
    return this.articleService.getAll();
  }

  // TODO: get articles by author
  // TODO: delete article
  // TODO: Favorite feature
}
