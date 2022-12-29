import { Injectable, Logger } from '@nestjs/common';
import { FollowerRepository } from './repositories/follower.repository';
import { ProfileRepository } from './repositories/profile.repository';

const logger = new Logger();

@Injectable()
export class ProfileService {

  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly followerRepository: FollowerRepository
  ) { }

  async getProfile(username: string, currentUserEmail: string) {
    logger.log('PROFILE-SERVICE: Getting User Profile');

    const profile = await this.profileRepository.getProfileByUsername(username);

    if (profile) {
      logger.log('PROFILE-SERVICE: Profile found');

      delete profile?.password;

      const followers = await this.followerRepository.getFollowers(profile?.email);
      const isFollowing = followers.find((follower) => follower.followed_by === currentUserEmail);

      return {
        ...profile,
        following: isFollowing ? true : false
      };
    }

    logger.log('PROFILE-SERVICE: Profile not found');
    return;
  }

  async follow(payload) {
    await this.followerRepository.follow(payload.follow, payload.follower);

    return true;
  }

  async unfollow(payload) {
    await this.followerRepository.unfollow(payload.follow, payload.follower);

    return true;
  }
}
