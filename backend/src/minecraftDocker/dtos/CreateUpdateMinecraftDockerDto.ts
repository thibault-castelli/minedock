import { IsPositive, IsString, Length, Max, Min } from 'class-validator';

export class CreateUpdateMinecraftDockerDto {
  @IsString()
  @Length(3, 255, {
    message: 'Name length must be between 3 and 255 characters',
  })
  name: string;

  @IsPositive({ message: 'Memory must be a positive number' })
  @Min(1, { message: 'Memory must be at least 1GB' })
  @Max(16, { message: 'Memory not be greater than 16GB' })
  memory: number;
}
