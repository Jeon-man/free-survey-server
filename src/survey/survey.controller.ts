import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSurveyBody } from './survey.dto';
import { Survey } from './survey.model';

@Controller('surveys')
export class SurveyController {
  constructor(
    @InjectModel(Survey)
    private readonly surveyModel: typeof Survey,
  ) {}

  @Post()
  async createSurvey(@Body() createSurveyData: CreateSurveyBody) {
    return this.surveyModel.create(createSurveyData);
  }

  @Get(':surveyId')
  async getSurvey(@Param('surveyId') surveyId: number) {
    return this.surveyModel.findOne({
      where: { id: surveyId },
      rejectOnEmpty: new NotFoundException(`Not found Survey`),
    });
  }
}
