import { IsString, IsInt, IsNumber, IsBoolean, Min, IsOptional, Max } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateQuestDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  difficulty: string;

  @IsNumber()
  @Min(30)
  @Max(180)
  duration: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(1)
  maxPlayers: number;

  @IsInt()
  @Min(1)
  minPlayers: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @Expose()
  category: string;

  @IsString()
  imageUrl: string;
} 