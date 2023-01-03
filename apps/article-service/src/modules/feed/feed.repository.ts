import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from '@conduit/cassandra-service';
import { Feed } from './feed.model';

@Injectable()
export class FeedRepository implements OnModuleInit {

  constructor(private cassandraService: CassandraService) { }

  feedMapper: mapping.ModelMapper<Feed>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        'Articles': {
          tables: ['articles'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings
        }
      }
    }

    this.feedMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Articles');
  }

  create(article) {
    return this.feedMapper.insert(article);
  }

  getByTitle(title: string) {
    return this.feedMapper.find({ title });
  }

  updateArticle(article) {
    return this.feedMapper.update(article);
  }

  async getAll() {
    return await (await this.feedMapper.findAll()).toArray();
  }

  async getByAuthor(email: string) {
    console.log(email)
    // TODO: Fix the email payload object
    const res = await this.cassandraService.client
      .execute(`SELECT * FROM articles WHERE author = '${email['email']}' ALLOW FILTERING`);

    console.log(res.rows)
    return res?.rows;
  }

}