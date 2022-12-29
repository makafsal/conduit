import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from '@conduit/cassandra-service';
import { Follower } from '../models/follower.model';

@Injectable()
export class FollowerRepository implements OnModuleInit {

  constructor(private cassandraService: CassandraService) { }

  followerMapper: mapping.ModelMapper<Follower>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        'Follower': {
          tables: ['followers'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings
        }
      }
    }

    this.followerMapper = this.cassandraService.createMapper(mappingOptions).forModel('Follower');
  }

  async getFollowers(email: string) {
    const res = await this.cassandraService.client.execute(`SELECT * FROM followers WHERE followed_profile = '${email}' ALLOW FILTERING`);

    return res?.rows;
  }

  follow(followed_profile, followed_by) {
    return this.followerMapper.insert({
      followed_profile,
      followed_by
    });
  }

  unfollow(followed_profile, followed_by) {
    return this.cassandraService
      .client
      .execute(
        `DELETE FROM followers WHERE followed_profile = '${followed_profile}' AND followed_by = '${followed_by}'`
      );
  }

}