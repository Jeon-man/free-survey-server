import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
  imports: [],
  providers: [SurveyService],
  controllers: [SurveyController],
  exports: [],
})
export default class SurveyModule {}
