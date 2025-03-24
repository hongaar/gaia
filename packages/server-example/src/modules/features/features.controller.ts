import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
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
  getFeatureCollection(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<FeatureCollection> {
    return this.featuresService.getFeatureCollection(id, request);
  }
}
