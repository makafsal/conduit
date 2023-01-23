import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetAuthorArticleInput {
  @Field()
  author: string;

  @Field()
  currentUser: string;

  @Field()
  token: string;
}