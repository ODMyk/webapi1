import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { SendAnalyticsDto } from './dtos/send-analytics.dto';
import { GoogleAnalyticsService } from 'src/google-analytics/google-analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly service: AnalyticsService,
    private readonly gaService: GoogleAnalyticsService,
  ) {}

  @Post()
  @HttpCode(204)
  async sendAnalytics(
    @Body(new ValidationPipe({ transform: true })) dto: SendAnalyticsDto,
  ) {
    await this.gaService.sendEvent('Analytics', { email: dto.email });
    await this.service.sendAnalytics(dto.email);
  }
}
