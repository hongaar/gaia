import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesService } from './features.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import { NotFoundException } from '@nestjs/common';

jest.mock('fs/promises');

describe('FeaturesService', () => {
  let service: FeaturesService;
  let consoleSpy: jest.SpyInstance;

  beforeEach(async () => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeaturesService],
    }).compile();

    service = module.get<FeaturesService>(FeaturesService);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFeatureCollection', () => {
    it('should return a feature collection when file exists', async () => {
      const mockFeatureCollection = {
        $schema: 'test-schema',
        href: 'test-href',
        type: 'FeatureCollection',
        features: [
          {
            href: 'feature-href',
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [0, 0],
            },
            properties: {
              id: 'test-id',
              modified: '2024-03-20',
              name: 'Test Feature',
              color: '#000000',
              icon: 'test-icon',
            },
            metadata: {},
          },
        ],
      };

      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockFeatureCollection),
      );

      const result = await service.getFeatureCollection('test-id');
      expect(result).toEqual(mockFeatureCollection);
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when file does not exist', async () => {
      const error = new Error('File not found');
      (fs.readFile as jest.Mock).mockRejectedValue(error);

      await expect(
        service.getFeatureCollection('non-existent'),
      ).rejects.toThrow(NotFoundException);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error reading feature collection non-existent:',
        error,
      );
    });
  });

  describe('listFeatureCollections', () => {
    it('should return list of feature collection IDs', async () => {
      const mockFiles = ['collection1.json', 'collection2.json'];
      (fs.readdir as jest.Mock).mockResolvedValue(mockFiles);

      const result = await service.listFeatureCollections();
      expect(result).toEqual(['collection1', 'collection2']);
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should return empty array when directory read fails', async () => {
      const error = new Error('Directory read failed');
      (fs.readdir as jest.Mock).mockRejectedValue(error);

      const result = await service.listFeatureCollections();
      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error listing feature collections:',
        error,
      );
    });
  });
});
