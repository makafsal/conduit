import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "../../shared/types/user/user.dto";
import { CreateUserInput } from "../../shared/types/user/input/create-user.input";
import { UpdateUserInput } from "../../shared/types/user/input/update-user.input";
import { UpdatedUserOutput } from "../../shared/types/user/output/update-user.output";
import { GetUserInput } from "../../shared/types/user/input/get-user.input";
import { UseGuards } from "@nestjs/common";
import { LoginUserOutput } from "../../shared/types/user/output/login-user.output";
import { LoginUserInput } from "../../shared/types/user/input/login-user.input";
import { GraphQLAuthGuard } from "../../shared/jwt/jwt-auth.guard";
import { CreateUserOutput } from "../../shared/types/user/output/create-user.output";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Query(() => [User])
  @UseGuards(GraphQLAuthGuard)
  users() {
    return this.authService.getUsers();
  }

  @Query(() => User)
  @UseGuards(GraphQLAuthGuard)
  getUser(@Args('email') email: string) {
    return this.authService.getUser(email);
  }

  @Mutation(() => CreateUserOutput)
  createUser(@Args('user') user: CreateUserInput) {
    return this.authService.createUser(user);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => UpdatedUserOutput)
  updateUser(@Args('user') user: UpdateUserInput) {
    return this.authService.updateUser(user);
  }

  @Query(() => LoginUserOutput)
  loginUser(@Args('user') user: LoginUserInput) {
    return this.authService.login(user);
  }
}