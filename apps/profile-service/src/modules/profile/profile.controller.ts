import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {

  constructor(
    private profileService: ProfileService
  ) { }

  @MessagePattern('profile_get')
  handleGetProfile() {
    return this.profileService.getProfile();
  }

}
