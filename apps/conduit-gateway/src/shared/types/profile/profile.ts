import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class Profile {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  following: boolean;
}
