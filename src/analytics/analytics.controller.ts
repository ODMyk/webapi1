import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { SendAnalyticsDto } from './dtos/send-analytics.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly service: AnalyticsService) {}

  @Post()
  @HttpCode(204)
  async sendAnalytics(
    @Body(new ValidationPipe({ transform: true })) dto: SendAnalyticsDto,
  ) {
    await this.service.sendAnalytics(dto.email);
  }
}
