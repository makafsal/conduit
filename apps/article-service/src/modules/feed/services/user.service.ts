import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository
  ) { }

  getUserByEmail(email: string) {
    return this.userRepository.getUserByEmail(email);
  }

  getAllUsers() {
    return this.userRepository.getAll();
  }
}