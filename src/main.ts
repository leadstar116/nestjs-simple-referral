import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { initSwagger } from './swagger'
import { ValidationPipe } from '@nestjs/common'

const PORT = Number(process.env.PORT) || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  initSwagger(app);

  await app.listen(PORT, '0.0.0.0');
}

bootstrap();
