import { Module } from '@nestjs/common';
import { CassandraService } from './cassandra.service';

@Module({
  controllers: [],
  providers: [CassandraService],
  exports: [CassandraService]
})
export class CassandraModule { }
