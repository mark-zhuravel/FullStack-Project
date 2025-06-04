import { IsString, IsNumber, IsDateString, Matches } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  questId: string;

  @IsNumber()
  numberOfPlayers: number;

  @IsDateString()
  dateTime: Date;

  @IsNumber()
  price: number;

  @IsString()
  @Matches(/\+?\d{10,15}/, { message: 'Введите корректный номер телефона' })
  phone: string;
} 