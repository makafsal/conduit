import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from '@conduit/cassandra-service';
import { Favorite } from './models/favorite.model';

@Injectable()
export class FavoriteRepository implements OnModuleInit {

  constructor(private cassandraService: CassandraService) { }

  favoriteMapper: mapping.ModelMapper<Favorite>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        'Favorites': {
          tables: ['favorites'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings
        }
      }
    }

    this.favoriteMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Favorites');
  }

  async getAll() {
    return await (await this.favoriteMapper.findAll()).toArray();
  }

  async getByFavoritedBy(favorited_by: string) {
    const res = await this.cassandraService.client
      .execute(`SELECT * FROM favorites WHERE favorited_by = '${favorited_by}' ALLOW FILTERING`);

    return res?.rows;
  }

  create(favorite) {
    return this.favoriteMapper.insert(favorite);
  }

  remove(favorite) {
    return this.favoriteMapper.remove(favorite)
  }
}