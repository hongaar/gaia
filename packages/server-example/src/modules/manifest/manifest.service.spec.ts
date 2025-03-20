import { Test, TestingModule } from '@nestjs/testing';
import { ManifestService } from './manifest.service';
import * as fs from 'fs/promises';
import * as path from 'path';

jest.mock('fs/promises');

describe('ManifestService', () => {
  let service: ManifestService;
  let consoleSpy: jest.SpyInstance;

  beforeEach(async () => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManifestService],
    }).compile();

    service = module.get<ManifestService>(ManifestService);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getManifest', () => {
    it('should return manifest when file exists', async () => {
      const mockManifest = {
        $schema: 'test-schema',
        href: 'test-href',
        name: 'Test Manifest',
        description: 'Test Description',
        icon: 'test-icon',
        resources: [
          {
            href: 'resource-href',
            type: 'test-type',
            layers: [
              {
                id: 'layer-id',
                name: 'Test Layer',
                description: 'Layer Description',
                icon: 'layer-icon',
                options: ['option1', 'option2'],
                parameters: [{ key: 'param1', value: 'value1' }],
              },
            ],
          },
        ],
      };

      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockManifest),
      );

      const result = await service.getManifest();
      expect(result).toEqual(mockManifest);
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should throw error when file read fails', async () => {
      const error = new Error('File read failed');
      (fs.readFile as jest.Mock).mockRejectedValue(error);

      await expect(service.getManifest()).rejects.toThrow(
        'Failed to read manifest file',
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error reading manifest file:',
        error,
      );
    });
  });
});
