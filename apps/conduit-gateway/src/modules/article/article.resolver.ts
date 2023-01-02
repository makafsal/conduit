import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLAuthGuard } from '../../shared/jwt/jwt-auth.guard';
import { CreateArticleInput } from '../../shared/types/user/input/create-article.input';
import { CreateArticleOutput } from '../../shared/types/user/output/create-article.output';
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

}
