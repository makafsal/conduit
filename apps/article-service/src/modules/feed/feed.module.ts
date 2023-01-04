import { CassandraService } from '@conduit/cassandra-service';
import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedRepository } from './repositories/feed.repository';
import { TagRepository } from './repositories/tag.repository';
import { FeedService } from './services/feed.service';
import { TagService } from './services/tag.service';

@Module({
  controllers: [FeedController],
  providers: [
    FeedService,
    FeedRepository,
    TagService,
    TagRepository,
    CassandraService
  ],
})
export class FeedModule { }
