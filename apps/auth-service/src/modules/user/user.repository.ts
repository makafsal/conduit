import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { User } from './models/user.model';
import { CassandraService } from '../cassandra/cassandra.service';

@Injectable()
export class UserRepository implements OnModuleInit {

  constructor(private cassandraService: CassandraService) { }

  userMapper: mapping.ModelMapper<User>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        'User': {
          tables: ['users'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings,
        }
      }
    }

    this.userMapper = this.cassandraService.createMapper(mappingOptions).forModel('User');
  }

  async getUsers() {
    return (await this.userMapper.findAll()).toArray();
  }

  async findUser(user: User) {
    return await this.userMapper.find({ email: user.email });
  }

  createUser(user: User) {
    return this.userMapper.insert(user);
  }

  async updateUser(user: User) {
    return await this.userMapper.update(user);
  }
}