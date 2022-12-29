import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class User {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  token: string;
}
