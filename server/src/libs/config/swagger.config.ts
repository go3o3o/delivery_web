import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AUTH_API_KEY_NAME } from '../constants/auth.constant';

export function configureSwagger(
  app: INestApplication,
  description?: string,
  version?: string,
) {
  const options = new DocumentBuilder()
    .setTitle(`API Docs`)
    .setDescription(description || '')
    .setVersion(version || '1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      AUTH_API_KEY_NAME,
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/docs`, app, document);
}
