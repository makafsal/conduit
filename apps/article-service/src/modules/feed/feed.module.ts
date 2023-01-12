import { CassandraService } from '@conduit/cassandra-service';
import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { CommentRepository } from './repositories/comment.repository';
import { FavoriteRepository } from './repositories/favorite.repository';
import { FeedRepository } from './repositories/feed.repository';
import { TagRepository } from './repositories/tag.repository';
import { UserRepository } from './repositories/user.repository';
import { CommentService } from './services/comment.service';
import { FavoriteService } from './services/favorite.service';
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
    UserRepository,
    FavoriteRepository,
    FavoriteService,
    CommentService,
    CommentRepository
  ],
})
export class FeedModule { }
