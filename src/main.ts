import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { resolve, join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const option = new DocumentBuilder()
    .setTitle('Book Inventory API BY SHRI')
    .setDescription('Book Inventory API')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
        in: 'header',
        name: 'authorization',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
