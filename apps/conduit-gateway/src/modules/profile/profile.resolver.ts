import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphQLAuthGuard } from '../../shared/jwt/jwt-auth.guard';
import { Profile } from '../../shared/types/profile/profile';
import { GetProfileInput } from '../../shared/types/user/input/get-profile.input';
import { ProfileService } from './profile.service';

@Resolver()
export class ProfileResolver {
  constructor(
    private profileService: ProfileService
  ) { }

  @Query(() => Profile)
  @UseGuards(GraphQLAuthGuard)
  getProfile(@Args('profileArgs') profileArgs: GetProfileInput) {
    return this.profileService.getProfile(profileArgs);
  }

}
