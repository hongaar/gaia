import { Controller, Get } from '@nestjs/common';
import type { Manifest } from './manifest.service';
import { ManifestService } from './manifest.service';

@Controller()
export class ManifestController {
  constructor(private readonly manifestService: ManifestService) {}

  @Get()
  getManifest(): Promise<Manifest> {
    return this.manifestService.getManifest();
  }
}
