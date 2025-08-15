import { Controller, Get } from '@nestjs/common';
import { DockerService } from './docker.service';

@Controller('docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}

  @Get('status')
  getDockerStatus() {
    return {
      isRunning: this.dockerService.isDockerRunning(),
    };
  }
}
