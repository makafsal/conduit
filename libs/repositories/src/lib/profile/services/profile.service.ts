import { Injectable, Logger } from '@nestjs/common';
import { ProfileRepository } from '../profile.repository';
import { FollowerService } from './follower.service';

const logger = new Logger();

@Injectable()
export class ProfileService {

  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly followerService: FollowerService
  ) { }

  async getProfile(username: string, currentUserEmail: string) {
    logger.log('PROFILE-SERVICE: Getting User Profile');

    const profile = await this.profileRepository.getProfileByUsername(username);

    if (profile) {
      logger.log('PROFILE-SERVICE: Profile found');

      delete profile?.password;

      const followers = await this.followerService.getFollowers(profile?.email);
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
    await this.followerService.follow(payload.follow, payload.follower);

    return true;
  }

  async unfollow(payload) {
    await this.followerService.unfollow(payload.follow, payload.follower);

    return true;
  }
}
