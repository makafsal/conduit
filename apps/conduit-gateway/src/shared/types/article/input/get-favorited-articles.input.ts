import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetFavoritedArticlesInput {
  @Field()
  favoritedUser: string;

  @Field()
  currentUser: string;

  @Field()
  token: string;
}