import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetPopularTagsInput {
  @Field()
  token: string;
}