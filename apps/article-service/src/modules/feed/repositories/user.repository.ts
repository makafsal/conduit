import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { User } from '../models/user.model';
import { CassandraService } from '@conduit/cassandra-service';
@Injectable()
export class UserRepository implements OnModuleInit {

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

  async getAll() {
    return (await this.userMapper.findAll()).toArray();
  }

  async getUserByEmail(email: string) {
    return await (await this.userMapper.find({ email })).first();
  }
}