import { Injectable, OnModuleInit } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { google } from 'googleapis';

const createTransporter = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.log('*ERR: ', err);
        reject();
      }
      resolve(token);
    });
  });

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.USER_EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken.toString(),
    },
  });
  return transporter;
};

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: Transporter;

  async onModuleInit() {
    this.transporter = await createTransporter();
  }

  async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.transporter.sendMail({
        to,
        subject,
        text,
      });
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }
}
