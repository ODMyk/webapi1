import { Module } from '@nestjs/common';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoogleAnalyticsModule } from 'src/google-analytics/google-analytics.module';

@Module({
  imports: [PrismaModule, GoogleAnalyticsModule],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
