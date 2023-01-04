import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from '@conduit/cassandra-service';
import { Tag } from '../models/tag.model';

@Injectable()
export class TagRepository implements OnModuleInit {

  constructor(private cassandraService: CassandraService) { }

  tagMapper: mapping.ModelMapper<Tag>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        'Tags': {
          tables: ['tags'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings
        }
      }
    }

    this.tagMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Tags');
  }

  create(tag) {
    return this.tagMapper.insert(tag);
  }

  update(tag) {
    return this.tagMapper.update(tag);
  }

  async getAll() {
    return await (await this.tagMapper.findAll()).toArray();
  }

  async get(name: string) {
    return await (await this.tagMapper.find({ name })).first();
  }

  remove(name: string) {
    return this.tagMapper.remove({ name });
  }

}