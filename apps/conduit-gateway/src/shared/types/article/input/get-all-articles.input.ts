import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetAllArticlesInput {

  @Field()
  currentUser: string;

  @Field()
  token: string;
}