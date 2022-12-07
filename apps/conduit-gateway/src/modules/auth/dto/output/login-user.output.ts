import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class LoginUserOutput {
  @Field()
  email: string;

  @Field()
  token: string;
}
