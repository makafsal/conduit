import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { User } from './user.model';
import { CassandraService } from '../common/cassandra.service';

@Injectable()
export class AppRepository implements OnModuleInit {

  constructor(private cassandraService: CassandraService) { }

  userMapper: mapping.ModelMapper<User>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        'User': {
          tables: ['users'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings
        }
      }
    }

    this.userMapper = this.cassandraService.createMapper(mappingOptions).forModel('User');
  }

  async getUsers() {
    return (await this.userMapper.findAll()).toArray();
  }
}