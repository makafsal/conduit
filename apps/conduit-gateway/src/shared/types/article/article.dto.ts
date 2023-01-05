import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { Author } from "./author.dto";

@ArgsType()
@ObjectType()
export class Article {
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
  author: Author;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  // @Field({ nullable: true })
  // favorited: boolean;

  // @Field()
  // favoriteCount: number;
}