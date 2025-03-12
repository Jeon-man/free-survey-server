import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSurveyBody } from './survey.dto';
import { SurveyService } from './survey.service';
import { Transactional } from '../db/transaction.decorator';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Transactional()
  @Post()
  async createSurvey(@Body() createSurveyData: CreateSurveyBody) {
    return this.surveyService.createSurvey(createSurveyData);
  }

  @Get(':surveyId')
  async getSurvey(@Param('surveyId') surveyId: string) {
    return this.surveyService.findSurvey({
      id: surveyId,
    });
  }
}
