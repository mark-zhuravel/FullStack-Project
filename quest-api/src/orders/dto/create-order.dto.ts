import { IsNotEmpty, IsNumber, IsString, IsDateString, Min, Max } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  questId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(20) //  максимальное количество игроков
  numberOfPlayers: number;

  @IsNotEmpty()
  @IsDateString()
  dateTime: string; // Будет преобразовано в DateTime в сервисе

  @IsNotEmpty()
  @IsString()
  phone: string;
} 