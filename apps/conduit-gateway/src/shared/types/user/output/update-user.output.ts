import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class UpdatedUserOutput {

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  token: string;
}
