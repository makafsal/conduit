import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class UpdateArticleOutput {
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
  updated_at: string;
}