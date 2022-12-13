import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class CreateUserOutput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  token: string;
}