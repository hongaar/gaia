import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../src/modules/config/config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should extract BASE_URL from request with host header', () => {
    const request = {
      protocol: 'http',
      headers: {
        host: 'example.com',
      },
    };

    expect(service.getBaseUrlFromRequest(request)).toBe('http://example.com');
  });

  it('should use HTTPS protocol when specified in request', () => {
    const request = {
      protocol: 'https',
      headers: {
        host: 'example.com',
      },
    };

    expect(service.getBaseUrlFromRequest(request)).toBe('https://example.com');
  });

  it('should use default when host header is missing', () => {
    process.env.PORT = '3001';
    const request = {
      protocol: 'http',
      headers: {},
    };

    expect(service.getBaseUrlFromRequest(request)).toBe(
      'http://localhost:3001',
    );
  });

  it('should replace BASE_URL placeholder in content', () => {
    const baseUrl = 'https://api.example.com';

    const testJson = JSON.stringify({
      $schema: '{{BASE_URL}}/manifest.schema.json',
      href: '{{BASE_URL}}',
      icon: '{{BASE_URL}}/icon.png',
    });

    const result = service.replaceBaseUrl(testJson, baseUrl);
    const parsed = JSON.parse(result);

    expect(parsed.$schema).toBe('https://api.example.com/manifest.schema.json');
    expect(parsed.href).toBe('https://api.example.com');
    expect(parsed.icon).toBe('https://api.example.com/icon.png');
  });
});
