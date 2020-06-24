import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger'
import { configService } from './config/config.service';

export function initSwagger(app: INestApplication): OpenAPIObject {
  const appUrl = configService.getValue("API_URL", "http://localhost:8080")
  const config = new DocumentBuilder()
    .setTitle('API Document')
    .setDescription('API Document')
    .addBearerAuth({
      "type": "http",
      "scheme": "bearer",
      "bearerFormat": "JWT",
    })
    .addServer(appUrl)
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  return document
}
