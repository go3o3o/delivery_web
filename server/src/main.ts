import { NestFactory } from '@nestjs/core';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { configureSwagger } from './libs/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3030;
  app.use((req, res, next) => {
    res.header('X-Powered-By', 'YONI');
    next();
  });
  // 검색로봇 수집 차단
  app['all']('/robots.txt', function (req, res) {
    res.status(HttpStatus.OK).send('User-agent: *\nDisallow: /');
  });

  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  configureSwagger(app);

  await app.listen(port);
}
bootstrap();
