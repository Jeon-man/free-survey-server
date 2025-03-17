import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import PrismaModule from '../db/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory() {
        return {
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  providers: [SurveyService],
  controllers: [SurveyController],
  exports: [],
})
export default class SurveyModule {}
