import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SerializeOptions, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { RolesGuard } from '../core/guards/roles.guard';
import { Roles } from '../core/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { QuestResponseDto } from './dto/quest-response.dto';

@Controller('quests')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createQuestDto: CreateQuestDto): Promise<QuestResponseDto> {
    const quest = await this.questsService.create(createQuestDto);
    return new QuestResponseDto(quest);
  }

  @Get()
  async findAll(): Promise<QuestResponseDto[]> {
    const quests = await this.questsService.findAll();
    return quests.map(quest => new QuestResponseDto(quest));
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAllAdmin(): Promise<QuestResponseDto[]> {
    const quests = await this.questsService.findAllAdmin();
    return quests.map(quest => new QuestResponseDto(quest));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<QuestResponseDto> {
    const quest = await this.questsService.findOne(id);
    return new QuestResponseDto(quest);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateQuestDto: UpdateQuestDto,
  ): Promise<QuestResponseDto> {
    const quest = await this.questsService.update(id, updateQuestDto);
    return new QuestResponseDto(quest);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string): Promise<QuestResponseDto> {
    const quest = await this.questsService.remove(id);
    return new QuestResponseDto(quest);
  }

  @Patch(':id/toggle')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async toggleActive(@Param('id') id: string): Promise<QuestResponseDto> {
    const quest = await this.questsService.toggleActive(id);
    return new QuestResponseDto(quest);
  }
} 