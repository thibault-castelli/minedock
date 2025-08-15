import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUpdateMinecraftDockerDto } from './dtos/CreateUpdateMinecraftDockerDto';
import { MinecraftDockerService } from './minecraftDocker.service';
import { MinecraftDocker } from '../entities/minecraftDocker.entity';

@Controller('minecraft-dockers')
export class MinecraftDockerController {
  constructor(
    private readonly minecraftDockerService: MinecraftDockerService,
  ) {}

  @Post()
  async create(
    @Body()
    createMinecraftDockerDto: CreateUpdateMinecraftDockerDto,
  ): Promise<MinecraftDocker> {
    return this.minecraftDockerService.create(createMinecraftDockerDto);
  }

  @Post('build-and-run/:id')
  async buildAndRunMinecraftServer(@Param('id', ParseIntPipe) id: number) {
    const result = await this.minecraftDockerService.buildAndRun(id);
    return {
      success: true,
      message: 'Minecraft server built and running',
      data: result,
    };
  }

  @Post('stop/:id')
  async stopMinecraftServer(@Param('id', ParseIntPipe) id: number) {
    await this.minecraftDockerService.stop(id);
    return {
      success: true,
      message: 'Minecraft server stopped',
    };
  }

  @Get()
  async findAll(): Promise<MinecraftDocker[]> {
    return this.minecraftDockerService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MinecraftDocker> {
    return this.minecraftDockerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateMinecraftDockerDto: CreateUpdateMinecraftDockerDto,
  ): Promise<MinecraftDocker> {
    return this.minecraftDockerService.update(id, updateMinecraftDockerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.minecraftDockerService.remove(+id);
  }
}
