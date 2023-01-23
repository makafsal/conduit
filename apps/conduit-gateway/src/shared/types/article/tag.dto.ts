import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Tag {

  @Field()
  name: string;

  @Field()
  count: number;
}