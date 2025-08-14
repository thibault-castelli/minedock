import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinecraftDockerModule } from './minecraftDocker/minecraftDocker.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'minedock.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MinecraftDockerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
