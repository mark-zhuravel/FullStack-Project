import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { GetUser } from '../core/decorators/get-user.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@GetUser() user: any, @Body() createOrderDto: CreateOrderDto) {
    console.log('User from decorator:', user);
    return this.ordersService.create(user.id, createOrderDto);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.ordersService.findAll(userId);
  }

  @Get(':id')
  findOne(@GetUser('id') userId: string, @Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(userId, id, updateOrderDto);
  }

  @Post(':id/cancel')
  cancel(@GetUser('id') userId: string, @Param('id', ParseIntPipe) id: number) {
    return this.ordersService.cancel(userId, id);
  }
} 