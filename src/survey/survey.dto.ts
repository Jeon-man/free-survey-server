import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSurveyBody {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
