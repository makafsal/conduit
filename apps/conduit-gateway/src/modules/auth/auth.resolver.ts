import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "./dto/output/user.dto";
import { CreateUserInput } from "./dto/input/create-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { UpdatedUserOutput } from "./dto/output/update-user.output";
import { GetUserInput } from "./dto/input/get-user.input";
import { UseGuards } from "@nestjs/common";
import { LoginUserOutput } from "./dto/output/login-user.output";
import { LoginUserInput } from "./dto/input/login-user.input";
import { GraphQLAuthGuard } from "../../shared/jwt/jwt-auth.guard";

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
  getUser(@Args('user') user: GetUserInput) {
    return this.authService.getUser(user);
  }

  @Mutation(() => User)
  @UseGuards(GraphQLAuthGuard)
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