import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { AppModule } from './app.module';

export const handler = async (req: VercelRequest, res: VercelResponse) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  await app.init();
  return app.getHttpAdapter().getInstance()(req, res);
};
