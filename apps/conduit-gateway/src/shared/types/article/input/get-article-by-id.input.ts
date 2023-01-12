import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetArticleByIdInput {
  @Field()
  articleID: string;

  @Field()
  currentUser: string;

  @Field()
  token: string;
}