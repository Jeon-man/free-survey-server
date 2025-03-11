import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Application } from 'express';
import { AppModule } from './app.module';

export const handler = async (req: VercelRequest, res: VercelResponse) => {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const adapterHost = app.get(HttpAdapterHost);
  const httpAdaptor = adapterHost.httpAdapter;
  const instance = httpAdaptor.getInstance<Application>();
  instance(req, res);
};
