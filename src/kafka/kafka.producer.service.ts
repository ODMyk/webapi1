import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { config } from 'dotenv';
import { Producer, Kafka, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaProducerService
  implements OnApplicationShutdown, OnModuleInit
{
  private readonly kafka = new Kafka({ brokers: ['localhost:9092'] });
  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
    config();
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
