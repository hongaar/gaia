import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  const port = process.env.PORT || 3001;
  await app.listen(port);

  // Log server info
  console.log(`Server is running on port ${port}`);
  console.log(
    `BASE_URL will be auto-detected from incoming requests' Host header`,
  );
}

bootstrap();
