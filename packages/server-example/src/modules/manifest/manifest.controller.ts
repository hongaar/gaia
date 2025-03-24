import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import type { Manifest } from './manifest.service';
import { ManifestService } from './manifest.service';

@Controller()
export class ManifestController {
  constructor(private readonly manifestService: ManifestService) {}

  @Get()
  getManifest(@Req() request: Request): Promise<Manifest> {
    return this.manifestService.getManifest(request);
  }
}
