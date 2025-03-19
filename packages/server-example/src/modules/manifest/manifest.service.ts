import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface Manifest {
  $schema: string;
  href: string;
  name: string;
  description: string;
  icon: string;
  resources: Array<{
    href: string;
    type: string;
    layers: Array<{
      id: string;
      name: string;
      description: string;
      icon: string;
      options: string[];
      parameters: Array<{
        key: string;
        value: string;
      }>;
    }>;
  }>;
}

@Injectable()
export class ManifestService {
  private readonly manifestPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'fixtures',
    'manifest.json',
  );

  async getManifest(): Promise<Manifest> {
    try {
      const manifestContent = await fs.readFile(this.manifestPath, 'utf-8');
      return JSON.parse(manifestContent) as Manifest;
    } catch (error) {
      console.error('Error reading manifest file:', error);
      throw new Error('Failed to read manifest file');
    }
  }
}
