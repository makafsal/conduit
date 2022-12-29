import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetProfileInput {
  @Field()
  username: string;

  @Field()
  currentUserEmail: string;

  @Field()
  token: string;
}