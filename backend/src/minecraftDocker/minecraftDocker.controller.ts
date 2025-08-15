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
  async buildAndRunMinecraftServer(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.minecraftDockerService.buildAndRun(id);
  }

  @Post('stop/:id')
  async stopMinecraftServer(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.minecraftDockerService.stop(id);
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
