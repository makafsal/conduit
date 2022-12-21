import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
@ObjectType()
export class Profile {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  bio: string;

  @Field()
  following: boolean;
}
