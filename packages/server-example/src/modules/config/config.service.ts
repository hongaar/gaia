import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  getBaseUrlFromRequest(request: any): string {
    const protocol = request.protocol || 'http';
    const host =
      request.headers.host || `localhost:${process.env.PORT || 3001}`;
    return `${protocol}://${host}`;
  }

  replaceBaseUrl(content: string, baseUrl: string): string {
    return content.replace(/{{BASE_URL}}/g, baseUrl);
  }
}
