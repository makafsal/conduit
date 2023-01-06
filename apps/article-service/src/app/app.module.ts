import { Module } from '@nestjs/common';
import { FeedModule } from '../modules/feed/feed.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    FeedModule
  ],
  controllers: [AppController]
})
export class AppModule { }
