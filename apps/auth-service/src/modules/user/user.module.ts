import { Module } from '@nestjs/common';
// import { CassandraService } from '../cassandra/cassandra.service';
import { CassandraService } from '@conduit/cassandra-service';
import { UserController } from './user.controller';
import { UserRepository, UserService } from '@conduit/repositories';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    CassandraService,
    UserRepository
  ],
  exports: []
})
export class UserModule { }
