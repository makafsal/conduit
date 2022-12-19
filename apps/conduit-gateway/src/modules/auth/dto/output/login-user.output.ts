import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class LoginUserOutput {
  @Field()
  email: string;

  @Field()
  token: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  bio: string;
}
