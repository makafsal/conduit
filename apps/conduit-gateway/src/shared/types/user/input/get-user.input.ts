import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetUserInput {
  @Field()
  email: string;
}