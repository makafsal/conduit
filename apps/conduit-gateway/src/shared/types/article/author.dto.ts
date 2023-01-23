import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Author {

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  image: string;

  @Field()
  following: boolean;
}