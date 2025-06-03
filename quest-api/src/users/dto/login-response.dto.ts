import { User } from '../interfaces/user.interface';

export class LoginResponseDto {
  access_token: string;
  user: Omit<User, 'password'>;
} 