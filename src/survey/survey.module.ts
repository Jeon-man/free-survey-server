import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import PrismaModule from '../db/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SurveyService],
  controllers: [SurveyController],
  exports: [],
})
export default class SurveyModule {}
