import { CassandraService } from '@conduit/cassandra-service';
import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedRepository } from './feed.repository';
import { FeedService } from './feed.service';

@Module({
  controllers: [FeedController],
  providers: [
    FeedService,
    FeedRepository,
    CassandraService
  ],
})
export class FeedModule { }
