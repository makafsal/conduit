import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateArticleInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  body: string;
  
  @Field()
  tags: string;

  @Field()
  slug: string;

  @Field()
  author: string;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  token: string;
}