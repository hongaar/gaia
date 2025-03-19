import { Module } from '@nestjs/common';
import { FeaturesModule } from './modules/features/features.module';
import { ManifestModule } from './modules/manifest/manifest.module';

@Module({
  imports: [ManifestModule, FeaturesModule],
})
export class AppModule {}
