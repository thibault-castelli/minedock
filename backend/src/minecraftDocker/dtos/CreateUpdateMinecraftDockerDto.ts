import { IsPositive, IsString, Max, Min } from 'class-validator';

export class CreateUpdateMinecraftDockerDto {
  @IsString()
  @Max(255, { message: 'Name cannot be longer than 255 characters' })
  name: string;

  @IsPositive({ message: 'Memory must be a positive number' })
  @Min(1, { message: 'Memory must be at least 1GB' })
  @Max(16, { message: 'Memory not be greater than 16GB' })
  memory: number;
}
