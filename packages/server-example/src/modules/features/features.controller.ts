import { Controller, Get, Param } from '@nestjs/common';
import type { FeatureCollection } from './features.service';
import { FeaturesService } from './features.service';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  listFeatureCollections(): Promise<string[]> {
    return this.featuresService.listFeatureCollections();
  }

  @Get(':id')
  getFeatureCollection(@Param('id') id: string): Promise<FeatureCollection> {
    return this.featuresService.getFeatureCollection(id);
  }
}
