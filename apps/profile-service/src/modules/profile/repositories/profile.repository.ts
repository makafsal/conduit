import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from '@conduit/cassandra-service';
import { Profile } from '../models/profile.model';

@Injectable()
export class ProfileRepository implements OnModuleInit {

  constructor(private cassandraService: CassandraService) { }

  profileMapper: mapping.ModelMapper<Profile>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        'Profile': {
          tables: ['users'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings
        }
      }
    }

    this.profileMapper = this.cassandraService.createMapper(mappingOptions).forModel('Profile');
  }

  async getProfileByUsername(username: string) {
    const res = await this.cassandraService.client.execute(`SELECT * FROM users WHERE username = '${username}' ALLOW FILTERING`);

    return res?.rows[0];
  }

}