import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateArticleInput {
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
  updatedAt: string;
}