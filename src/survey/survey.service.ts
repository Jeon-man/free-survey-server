import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class SurveyService {
  constructor(private readonly prisma: PrismaService) {}

  async findSurvey(surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput) {
    return this.prisma.survey.findUnique({
      where: surveyWhereUniqueInput,
    });
  }

  async findManySurvey(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SurveyWhereUniqueInput;
    where?: Prisma.SurveyWhereInput;
    orderBy?: Prisma.SurveyOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.survey.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createSurvey(data: Prisma.SurveyCreateInput) {
    return this.prisma.survey.create({
      data,
    });
  }

  async deleteSurvey(surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput) {
    return this.prisma.survey.delete({
      where: surveyWhereUniqueInput,
    });
  }

  async updateSurvey(params: {
    where: Prisma.SurveyWhereUniqueInput;
    data: Prisma.SurveyUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.survey.update({
      data,
      where,
    });
  }
}
