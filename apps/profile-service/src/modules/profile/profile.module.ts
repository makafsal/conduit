import { CassandraService } from '@conduit/cassandra-service';
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './repositories/profile.repository';
import { ProfileService } from './profile.service';
import { FollowerRepository } from './repositories/follower.repository';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileRepository,
    FollowerRepository,
    CassandraService
  ],
})
export class ProfileModule { }
