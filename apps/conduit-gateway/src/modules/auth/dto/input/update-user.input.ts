import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
  @Field()
  email: string;

  // @Field()
  // password: string;

  // @Field()
  // username: string;

  @Field()
  bio: string;

  @Field()
  image: string;

  @Field()
  token: string;
}