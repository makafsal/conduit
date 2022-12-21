import { Module } from '@nestjs/common';
import { ProfileModule } from '../modules/profile/profile.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
