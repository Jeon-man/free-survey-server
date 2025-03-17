import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { VercelRequest, VercelResponse } from '@vercel/node';

import { AppModule } from './app.module';

let cachedApp: NestFastifyApplication | null = null;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept',
    });

    await app.init();
    cachedApp = app;
  }

  return cachedApp;
}
// bootstrap();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await bootstrap();

  const fastify = app.getHttpAdapter().getInstance();

  fastify.routing(req, res);
}
