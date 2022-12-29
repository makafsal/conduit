import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class FollowInput {
  @Field()
  follower: string;

  @Field()
  follow: string;

  @Field()
  token: string;
}