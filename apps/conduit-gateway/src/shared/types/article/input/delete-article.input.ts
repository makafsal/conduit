import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteArticleInput {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  token: string;
}