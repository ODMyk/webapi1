import { Injectable } from '@nestjs/common';
import { KafkaProducerService } from 'src/kafka/kafka.producer.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly kafkaProducer: KafkaProducerService,
    private readonly prisma: PrismaService,
  ) {}

  async sendAnalytics(email: string) {
    const users = await this.prisma.user.findMany({
      include: { companies: true, contracts: true },
    });
    let contractsCount = 0;
    let companiesCount = 0;
    let totalSalary = 0;
    users.forEach((u) => {
      contractsCount += u.contracts.length;
      companiesCount += u.companies.length;
      u.contracts.forEach((c) => (totalSalary += c.salary));
    });

    await this.kafkaProducer.produce({
      topic: 'email',
      messages: [
        {
          value: JSON.stringify({
            to: email,
            subject: 'Analytics',
            text: `There are ${companiesCount} companies, ${users.length} users and ${contractsCount} contracts between them. Each user earns ${totalSalary / users.length}$ in average`,
          }),
        },
      ],
    });
  }
}
