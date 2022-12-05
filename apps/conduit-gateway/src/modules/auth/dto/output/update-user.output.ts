import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class UpdatedUserOutput {
  @Field({ nullable: true })
  @Field()
  email: string;

  @Field({ nullable: true })
  @Field()
  username: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  token: string;
}
