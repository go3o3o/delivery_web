import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureSwagger(
  app: INestApplication,
  description?: string,
  version?: string,
) {
  const options = new DocumentBuilder()
    .setTitle(`API Docs`)
    .setDescription(description || '')
    .setVersion(version || '1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/docs`, app, document);
}
