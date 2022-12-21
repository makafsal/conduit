import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GraphQLAuthGuard } from '../../shared/jwt/jwt-auth.guard';
import { Profile } from '../../shared/types/profile/profile';
import { ProfileService } from './profile.service';

@Resolver()
export class ProfileResolver {
  constructor(
    private profileService: ProfileService
  ) { }

  // @Query(() => Profile)
  @Query(() => String)
  @UseGuards(GraphQLAuthGuard)
  getProfile() {
    return this.profileService.getProfile();
  }

}
