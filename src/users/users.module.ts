import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ElasticSearchModule } from 'src/elastic-search/elastic-search.module';
import { GoogleAnalyticsModule } from 'src/google-analytics/google-analytics.module';

@Module({
  imports: [PrismaModule, ElasticSearchModule, GoogleAnalyticsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
