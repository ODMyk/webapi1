import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { KafkaProducerService } from 'src/kafka/kafka.producer.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [KafkaModule, PrismaModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, KafkaProducerService],
})
export class AnalyticsModule {}
