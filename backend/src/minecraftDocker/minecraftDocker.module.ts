import { Module } from '@nestjs/common';
import { MinecraftDockerController } from './minecraftDocker.controller';
import { MinecraftDockerService } from './minecraftDocker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinecraftDocker } from '../entities/minecraftDocker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MinecraftDocker])],
  controllers: [MinecraftDockerController],
  providers: [MinecraftDockerService],
})
export class MinecraftDockerModule {}
