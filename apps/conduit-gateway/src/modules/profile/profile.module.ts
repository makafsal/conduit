import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROFILE-SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'profile-service',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'profile-service'
          }
        }
      },
    ])
  ],
  providers: [
    ProfileResolver,
    ProfileService
  ],
})
export class ProfileModule { }
