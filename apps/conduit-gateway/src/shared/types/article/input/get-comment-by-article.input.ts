import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetCommentByArticleInput {
  @Field()
  articleID: string;

  @Field()
  token: string;
}