import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetArticleByTagInput {
  @Field()
  tag: string;

  @Field()
  currentUser: string;

  @Field()
  token: string;
}