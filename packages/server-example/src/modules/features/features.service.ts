import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface FeatureCollection {
  $schema: string;
  href: string;
  type: 'FeatureCollection';
  features: Array<{
    href: string;
    type: 'Feature';
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: {
      id: string;
      modified: string;
      name: string;
      color: string;
      icon: string;
    };
    metadata: Record<string, unknown>;
  }>;
}

@Injectable()
export class FeaturesService {
  private readonly featureCollectionsPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'fixtures',
    'feature-collections',
  );

  async getFeatureCollection(id: string): Promise<FeatureCollection> {
    try {
      const filePath = path.join(this.featureCollectionsPath, `${id}.json`);
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content) as FeatureCollection;
    } catch (error) {
      console.error(`Error reading feature collection ${id}:`, error);
      throw new NotFoundException(`Feature collection ${id} not found`);
    }
  }

  async listFeatureCollections(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.featureCollectionsPath);
      return files
        .filter((file) => file.endsWith('.json'))
        .map((file) => file.replace('.json', ''));
    } catch (error) {
      console.error('Error listing feature collections:', error);
      return [];
    }
  }
}
