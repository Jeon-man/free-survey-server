import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../db/prisma.service';
import { comparePassword, hashPassword } from '../utils/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SurveyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

  async createSurvey({ password, ...data }: Prisma.SurveyCreateInput) {
    return this.prisma.survey.create({
      data: {
        ...data,
        password: hashPassword(password),
      },
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

  async compareSurveyPassword(surveyId: string, password: string) {
    const survey = await this.findSurvey({
      id: surveyId,
    });
    if (!survey) throw new NotFoundException(`Survey${surveyId} not found`);

    const compare = comparePassword(password, survey.password);
    if (!compare) throw new BadRequestException('Password is incorrect');

    const token = await this.jwtService.signAsync({ surveyId });

    return token;
  }
}
