import { CassandraService } from '@conduit/cassandra-service';
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import {
  FollowerService,
  ProfileRepository,
  ProfileService,
  FollowerRepository
} from '@conduit/repositories';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileRepository,
    FollowerRepository,
    FollowerService,
    CassandraService
  ],
})
export class ProfileModule { }
