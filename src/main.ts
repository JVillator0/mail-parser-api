import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  app.useLogger(new Logger());

  const config = new DocumentBuilder()
    .setTitle('Mail Parser API')
    .setDescription(
      'API para analizar correos electrónicos y extraer JSON adjuntos o en enlaces',
    )
    .setVersion('1.0')
    .addTag('email-parser')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

  Logger.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(`Check the API documentation at: ${await app.getUrl()}/api/docs`);
}
bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
});
