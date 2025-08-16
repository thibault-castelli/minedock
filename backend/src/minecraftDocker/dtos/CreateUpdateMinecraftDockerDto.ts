import { IsBoolean, IsIn, IsString, Length, Max, Min } from 'class-validator';
import type { Difficulty, Mode } from '../../entities/minecraftDocker.entity';

export class CreateUpdateMinecraftDockerDto {
  @IsString({ message: 'Name must be a string' })
  @Length(3, 255, {
    message: 'Name length must be between 3 and 255 characters',
  })
  name: string;

  @Min(1, { message: 'Memory must be at least 1GB' })
  @Max(16, { message: 'Memory must not be greater than 16GB' })
  memory: number;

  @IsString({ message: 'Difficulty must be a string' })
  @IsIn(['peaceful', 'easy', 'normal', 'hard'], {
    message: 'Difficulty should be peaceful, easy, normal or hard',
  })
  difficulty: Difficulty;

  @IsString({ message: 'Mode must be a string' })
  @IsIn(['survival', 'creative'], {
    message: 'Mode should be survival or creative',
  })
  mode: Mode;

  @Min(1, { message: 'Max players must be at least 1' })
  @Max(40, { message: 'Max players must not be greater than 40' })
  maxPlayers: number;

  @IsBoolean({ message: 'Hardcore must be a boolean' })
  hardcore: boolean;

  @IsBoolean({ message: 'Spawn animals must be a boolean' })
  spawnAnimals: boolean;

  @IsBoolean({ message: 'Spawn monsters must be a boolean' })
  spawnMonsters: boolean;

  @IsBoolean({ message: 'Spawn NPCS must be a boolean' })
  spawnNpcs: boolean;

  @IsBoolean({ message: 'PVP must be a boolean' })
  pvp: boolean;
}
