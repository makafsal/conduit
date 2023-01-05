import { CassandraService } from '@conduit/cassandra-service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getuid } from 'process';
import { FeedController } from './feed.controller';
import { FeedRepository } from './repositories/feed.repository';
import { TagRepository } from './repositories/tag.repository';
import { UserRepository } from './repositories/user.repository';
import { FeedService } from './services/feed.service';
import { TagService } from './services/tag.service';
import { UserService } from './services/user.service';

@Module({
  controllers: [FeedController],
  providers: [
    FeedService,
    FeedRepository,
    TagService,
    TagRepository,
    CassandraService,
    UserService,
    UserRepository
  ],
})
export class FeedModule { }
