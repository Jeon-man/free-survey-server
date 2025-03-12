import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { VercelRequest, VercelResponse } from '@vercel/node';

import { AppModule } from './app.module';

type HTTPMethods =
  | 'DELETE'
  | 'delete'
  | 'GET'
  | 'get'
  | 'HEAD'
  | 'head'
  | 'PATCH'
  | 'patch'
  | 'POST'
  | 'post'
  | 'PUT'
  | 'put'
  | 'OPTIONS'
  | 'options';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.init();
  return app;
}
// bootstrap();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await bootstrap();

  const fastify = app.getHttpAdapter().getInstance();

  const result = await fastify.inject({
    method: (req.method as HTTPMethods) || 'GET',
    url: req.url || '/',
    headers: req.headers,
    payload: req.body as unknown as Record<string, any>,
  });

  res.status(result.statusCode).send(result.body);
}
