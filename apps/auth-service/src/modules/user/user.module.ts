import { Module } from '@nestjs/common';
import { CassandraService } from '../cassandra/cassandra.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    CassandraService,
    UserRepository
  ],
  exports: [
    // CassandraService
  ]
})
export class UserModule {}
