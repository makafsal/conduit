import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH-SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth-service',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'auth-service'
          }
        }
      },
    ])
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
