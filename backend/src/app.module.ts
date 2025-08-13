import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../typeorm.config';
import { MinecraftDockerModule } from './minecraftDocker/minecraftDocker.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), MinecraftDockerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
