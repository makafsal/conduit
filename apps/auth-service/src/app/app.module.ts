import { Module } from '@nestjs/common';
import { CassandraService } from '../common/cassandra.service';

import { AppController } from './app.controller';
import { AppRepository } from './app.respository';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    CassandraService,
    AppRepository
  ],
  exports: [
    CassandraService
  ]
})
export class AppModule { }
