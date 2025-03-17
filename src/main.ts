import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { VercelRequest, VercelResponse } from '@vercel/node';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  await app.init();
  return app;
}
// bootstrap();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await bootstrap();

  const fastify = app.getHttpAdapter().getInstance();

  await fastify.ready();
  fastify.server.emit('request', req, res);
}
