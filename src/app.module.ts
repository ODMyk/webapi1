import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { ContractsModule } from './contracts/contracts.module';
import { PrismaModule } from './prisma/prisma.module';
import { ElasticSearchModule } from './elastic-search/elastic-search.module';
import { KafkaModule } from './kafka/kafka.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { GoogleAnalyticsService } from './google-analytics/google-analytics.service';
import { GoogleAnalyticsModule } from './google-analytics/google-analytics.module';

@Module({
  imports: [
    UsersModule,
    CompaniesModule,
    ContractsModule,
    PrismaModule,
    ElasticSearchModule,
    KafkaModule,
    AnalyticsModule,
    GoogleAnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleAnalyticsService],
})
export class AppModule {}
