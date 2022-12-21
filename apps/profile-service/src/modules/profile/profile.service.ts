import { Injectable, Logger } from '@nestjs/common';

const logger = new Logger();

@Injectable()
export class ProfileService {

  getProfile() {
    logger.log('PROFILE-SERVICE: Getting User Profile');

    return 'from profile service';
  }

}
