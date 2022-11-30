import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "./dto/output/user.dto";
import { CreateUserInput } from "./dto/input/create-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { UpdatedUserOutput } from "./dto/output/update-user.output";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Query(() => [User])
  users() {
    return this.authService.getUsers();
  }

  @Mutation(() => User)
  createUser(@Args('user') user: CreateUserInput) {
    return this.authService.createUser(user);
  }

  @Mutation(() => UpdatedUserOutput)
  updateUser(@Args('user') user: UpdateUserInput) {
    return this.authService.updateUser(user);
  }
}