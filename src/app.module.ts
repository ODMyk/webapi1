import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { ContractsModule } from './contracts/contracts.module';
import { PrismaModule } from './prisma/prisma.module';
import { ElasticSearchModule } from './elastic-search/elastic-search.module';

@Module({
  imports: [UsersModule, CompaniesModule, ContractsModule, PrismaModule, ElasticSearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
