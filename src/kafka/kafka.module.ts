import { Module } from '@nestjs/common';
import { KafkaProducerService } from './kafka.producer.service';
import { KafkaConsumerService } from './kafka.consumer.service';
import { EmailConsumer } from './email.consumer';
import { EmailService } from './email.service';

@Module({
  providers: [
    KafkaProducerService,
    KafkaConsumerService,
    EmailConsumer,
    EmailService,
  ],
  exports: [
    KafkaProducerService,
    KafkaConsumerService,
    EmailConsumer,
    EmailService,
  ],
})
export class KafkaModule {}
