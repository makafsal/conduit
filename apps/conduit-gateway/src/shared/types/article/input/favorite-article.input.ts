import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class FavoriteArticleInput {
  @Field()
  article: string;

  @Field()
  favorited_by: string;

  @Field()
  token: string;
}