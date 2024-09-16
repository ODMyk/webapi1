import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService } from './kafka.consumer.service';
import { EmailService } from './email.service';

@Injectable()
export class EmailConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: KafkaConsumerService,
    private readonly emailService: EmailService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: ['email'] },
      {
        eachMessage: async ({ message }) => {
          const { to, subject, text } = JSON.parse(message.value.toString());
          await this.emailService.sendEmail(to, subject, text);
        },
      },
    );
  }
}
