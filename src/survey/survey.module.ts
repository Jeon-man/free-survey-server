import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SurveyController } from './survey.controller';
import { Survey } from './survey.model';
import { SurveyService } from './survey.service';

@Module({
  imports: [SequelizeModule.forFeature([Survey])],
  providers: [SurveyService],
  controllers: [SurveyController],
  exports: [SequelizeModule],
})
export default class SurveyModule {}
