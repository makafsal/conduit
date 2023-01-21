import { Injectable } from "@nestjs/common";
import { FollowerRepository } from "../follower.repository";

@Injectable()
export class FollowerService {

  constructor(
    private readonly followerRepository: FollowerRepository
  ) { }

  getAll() {
    return this.followerRepository.getAll();
  }

  getFollowers(email: string) {
    return this.followerRepository.getFollowers(email);
  }

  follow(followed_profile, follower) {
    return this.followerRepository.follow(followed_profile, follower);
  }

  unfollow(unFollowed_profile, follower) {
    return this.followerRepository.unfollow(unFollowed_profile, follower);
  }
}