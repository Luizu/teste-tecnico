import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  setupSwagger(app);

  await app.listen(8080);

  Logger.log(`Application is running on: http://localhost:8080/api`);
  Logger.log(`Swagger is running on: http://localhost:8080/docs`);
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API Template')
    .setDescription('API Template')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory);
}

void bootstrap();
