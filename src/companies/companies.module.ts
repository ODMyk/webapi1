import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { GoogleAnalyticsModule } from 'src/google-analytics/google-analytics.module';

@Module({
  imports: [
    PrismaModule,
    CacheModule.register({
      store: redisStore,
      host: 'redis',
      port: 6379,
      ttl: 600,
    }),
    GoogleAnalyticsModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
