import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GoogleAnalyticsService {
  private readonly measurementId = process.env.GA_MEASUREMENT_ID;
  private readonly apiSecret = process.env.GA_API_SECRET;

  async sendEvent(
    eventName: string,
    eventParams: Record<string, any>,
    clientId?: string,
  ): Promise<void> {
    if (!this.measurementId || !this.apiSecret) {
      console.warn('Google Analytics credentials are not set.');
      return;
    }

    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`;

    const payload = {
      client_id: clientId || uuidv4(),
      events: [
        {
          name: eventName,
          params: eventParams,
        },
      ],
    };

    try {
      const response = await axios.post(url, payload);
      if (response.status === 204) {
        console.log(
          `Event "${eventName}" sent successfully to Google Analytics.`,
        );
      } else {
        console.warn(
          `Unexpected response from Google Analytics: ${response.status}`,
        );
      }
    } catch (error) {
      console.error(
        'Error sending event to Google Analytics:',
        error.response?.data || error.message,
      );
    }
  }
}
