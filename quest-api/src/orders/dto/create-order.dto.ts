import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  questId: string;

  @IsNumber()
  numberOfPlayers: number;

  @IsDateString()
  dateTime: Date;

  @IsNumber()
  price: number;
} 