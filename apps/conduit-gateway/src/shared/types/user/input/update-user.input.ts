import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  image: string;

  @Field()
  token: string;
}