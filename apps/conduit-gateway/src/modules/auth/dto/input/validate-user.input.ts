import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ValidateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}