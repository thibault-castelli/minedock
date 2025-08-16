import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MinecraftDocker } from '../entities/minecraftDocker.entity';
import { Repository } from 'typeorm';
import { CreateUpdateMinecraftDockerDto } from './dtos/CreateUpdateMinecraftDockerDto';
import { join } from 'path';
import * as fs from 'node:fs';
import { execSync } from 'child_process';
import { createDirectoryIfNotFound } from '../utils/fileUtils';

@Injectable()
export class MinecraftDockerService {
  constructor(
    @InjectRepository(MinecraftDocker)
    private readonly minecraftDockerRepository: Repository<MinecraftDocker>,
  ) {}

  private readonly dockerFilesFolder = join(__dirname, '../..', 'Dockerfiles');

  async create(
    createMinecraftDockerDto: CreateUpdateMinecraftDockerDto,
  ): Promise<MinecraftDocker> {
    const minecraftDocker = this.minecraftDockerRepository.create(
      createMinecraftDockerDto,
    );
    return this.minecraftDockerRepository.save(minecraftDocker);
  }

  async buildAndRun(id: number): Promise<void> {
    await this.buildMinecraftDocker(id);

    try {
      execSync('docker compose up -d', {
        cwd: join(this.dockerFilesFolder, id.toString()),
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Server build and run failed. Please check if your Docker Desktop is running.',
      );
    }

    await this.updateMinecraftDockerRunningStatus(id, true);
  }

  async stop(id: number): Promise<void> {
    const dockerFilePath = join(this.dockerFilesFolder, id.toString());
    if (!fs.existsSync(dockerFilePath))
      throw new NotFoundException(`MinecraftDocker with ID ${id} not found`);

    try {
      execSync('docker compose stop', {
        cwd: dockerFilePath,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Server stop failed. Please check if your Docker Desktop is running.',
      );
    }

    await this.updateMinecraftDockerRunningStatus(id, false);
  }

  findAll(): Promise<MinecraftDocker[]> {
    return this.minecraftDockerRepository.find();
  }

  async findOne(id: number): Promise<MinecraftDocker> {
    const minecraftDocker = await this.minecraftDockerRepository.findOne({
      where: { id },
    });

    if (!minecraftDocker)
      throw new NotFoundException(`MinecraftDocker with ID ${id} not found`);
    return minecraftDocker;
  }

  async update(
    id: number,
    updateMinecraftDockerDto: CreateUpdateMinecraftDockerDto,
  ): Promise<MinecraftDocker> {
    await this.minecraftDockerRepository.update(id, updateMinecraftDockerDto);
    const updatedMinecraftDocker = await this.minecraftDockerRepository.findOne(
      { where: { id } },
    );

    if (!updatedMinecraftDocker)
      throw new NotFoundException(`MinecraftDocker with ID ${id} not found`);
    return updatedMinecraftDocker;
  }

  async remove(id: number): Promise<void> {
    await this.minecraftDockerRepository.softDelete(id);
  }

  private async buildMinecraftDocker(id: number): Promise<void> {
    const minecraftDocker = await this.findOne(id);
    const dockerFilePath = join(this.dockerFilesFolder, id.toString());

    createDirectoryIfNotFound(this.dockerFilesFolder);
    createDirectoryIfNotFound(dockerFilePath);

    const dockerComposeContent = `
    services:
      mc:
        image: itzg/minecraft-server
        tty: true
        stdin_open: true
        ports:
          - "25565:25565"
        environment:
          EULA: "TRUE"
          MEMORY: ${minecraftDocker.memory}G
          DIFFICULTY: ${minecraftDocker.difficulty}
          MODE: ${minecraftDocker.mode}
          MAX_PLAYERS: ${minecraftDocker.maxPlayers}
          HARDCORE: ${minecraftDocker.hardcore ? 'true' : 'false'}
          SPAWN_ANIMALS: ${minecraftDocker.spawnAnimals ? 'true' : 'false'}
          SPAWN_MONSTERS: ${minecraftDocker.spawnMonsters ? 'true' : 'false'}
          SPAWN_NPCS: ${minecraftDocker.spawnNpcs ? 'true' : 'false'}
          PVP: ${minecraftDocker.pvp ? 'true' : 'false'}
    `;

    fs.writeFileSync(join(dockerFilePath, 'compose.yml'), dockerComposeContent);
  }

  private async updateMinecraftDockerRunningStatus(
    id: number,
    isRunning: boolean,
  ): Promise<void> {
    const minecraftDocker = await this.findOne(id);
    minecraftDocker.isRunning = isRunning;
    await this.minecraftDockerRepository.update(id, minecraftDocker);
  }
}
