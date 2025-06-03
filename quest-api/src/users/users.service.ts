import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { MongodbService } from 'src/core/database/mongodb/mongodb.service';
import { User } from './interfaces/user.interface';
import { LoginResponseDto } from './dto/login-response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface CreateUserData {
  email: string;
  password: string;
  name: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    private prisma: MongodbService,
    private jwtService: JwtService,
  ) {}

  async create(data: CreateUserData): Promise<Omit<User, 'password'>> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new ConflictException('Пользователь с таким email уже существует');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
          role: 'USER',
        },
      });

      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Пользователь с таким email уже существует');
    }
  }

  async login(data: LoginUserData): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    const { password, ...userData } = user;

    return {
      access_token: token,
      user: userData,
    };
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, ...rest }) => rest);
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const { password, ...result } = user;
    return result;
  }
} 