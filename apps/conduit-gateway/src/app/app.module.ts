import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from '../modules/auth/auth.module';
import { ProfileModule } from '../modules/profile/profile.module';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      include: [
        AuthModule,
        ProfileModule
      ],
      cors: {
        origin: '*',
        credentials: false
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
