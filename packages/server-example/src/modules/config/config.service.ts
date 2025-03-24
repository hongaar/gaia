import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ConfigService {
  getBaseUrlFromRequest(request: Request): string {
    // Check for X-Forwarded-Proto header that proxies like Vercel set
    const protocol =
      (request.headers['x-forwarded-proto'] as string) ||
      request.protocol ||
      'http';

    const host =
      request.headers.host || `localhost:${process.env.PORT || 3001}`;

    return `${protocol}://${host}`;
  }

  replaceBaseUrl(content: string, baseUrl: string): string {
    return content.replace(/{{BASE_URL}}/g, baseUrl);
  }
}
