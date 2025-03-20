import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}

bootstrap();
