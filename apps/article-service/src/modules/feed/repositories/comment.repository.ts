import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from '@conduit/cassandra-service';
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentRepository implements OnModuleInit {

  constructor(private cassandraService: CassandraService) { }

  commentMapper: mapping.ModelMapper<Comment>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        'Comments': {
          tables: ['comments'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings
        }
      }
    }

    this.commentMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Comments');
  }

  async getByArticle(article) {
    const query = `SELECT * FROM comments WHERE article = '${article}' ALLOW FILTERING`;
    const response = await this.cassandraService
      .client
      .execute(query);

    return response?.rows;
  }

  create(comment) {
    return this.commentMapper.insert(comment);
  }

  remove(id) {
    return this.commentMapper.remove({ id });
  }
}