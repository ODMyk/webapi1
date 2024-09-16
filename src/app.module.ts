import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { ContractsModule } from './contracts/contracts.module';
import { PrismaModule } from './prisma/prisma.module';
import { ElasticSearchModule } from './elastic-search/elastic-search.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    UsersModule,
    CompaniesModule,
    ContractsModule,
    PrismaModule,
    ElasticSearchModule,
    CacheModule.register({
      store: redisStore,
      host: 'redis',
      port: 6379,
      ttl: 600,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
