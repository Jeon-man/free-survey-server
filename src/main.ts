import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Application } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return app;
}
// bootstrap();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await bootstrap();

  const adapterHost = app.get(HttpAdapterHost);
  const httpAdaptor = adapterHost.httpAdapter;
  const instance = httpAdaptor.getInstance<Application>();
  instance(req, res);
}
