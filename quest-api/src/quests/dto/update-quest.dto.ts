import { IsString, IsInt, IsNumber, Min, Max, IsBoolean, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestDto } from './create-quest.dto';

export class UpdateQuestDto extends PartialType(CreateQuestDto) {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  difficulty?: string;

  @IsInt()
  @IsOptional()
  @Min(30)
  @Max(180)
  duration?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  price?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  maxPlayers?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  minPlayers?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 