import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteCommentInput {
  @Field()
  id: string;

  @Field()
  token: string;
}