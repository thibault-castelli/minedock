import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';

@Injectable()
export class DockerService {
  isDockerRunning(): boolean {
    try {
      const result = execSync(
        'tasklist /FI "IMAGENAME eq Docker Desktop.exe"',
        { stdio: ['pipe', 'pipe', 'ignore'] },
      );
      return result.toString().includes('Docker Desktop.exe');
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
