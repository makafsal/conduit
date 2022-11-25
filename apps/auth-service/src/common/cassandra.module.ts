import { CassandraService } from './cassandra.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [CassandraService],
    exports: [CassandraService]
})
export class CassandraModule { }