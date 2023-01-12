import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { Author } from "./author.dto";

@ArgsType()
@ObjectType()
export class Article {
  @Field()
  id: string;

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
  createdAt: string;

  @Field({ nullable: true })
  updatedAt: string;

  @Field({ nullable: true })
  favorited: boolean;

  @Field({ nullable: true })
  favoriteCount: number;
}