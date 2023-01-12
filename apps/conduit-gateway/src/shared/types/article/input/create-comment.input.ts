import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCommentInput {
  @Field()
  body: string;

  @Field()
  article: string;

  @Field()
  author: string;

  @Field()
  created_at: string;

  @Field()
  token: string;
}