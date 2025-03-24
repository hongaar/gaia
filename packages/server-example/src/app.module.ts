import { Module } from '@nestjs/common';
import { ConfigModule } from './modules/config/config.module';
import { FeaturesModule } from './modules/features/features.module';
import { ManifestModule } from './modules/manifest/manifest.module';

@Module({
  imports: [ConfigModule, ManifestModule, FeaturesModule],
})
export class AppModule {}
