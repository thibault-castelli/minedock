export type Difficulty = 'peaceful' | 'easy' | 'normal' | 'hard';
export type Mode = 'creative' | 'survival';

export interface MinecraftDocker {
  id: number;
  name: string;
  isRunning: boolean;
  memory: number;
  difficulty: Difficulty;
  mode: Mode;
  maxPlayers: number;
  hardcore: boolean;
  spawnAnimals: boolean;
  spawnMonsters: boolean;
  spawnNpcs: boolean;
  pvp: boolean;
}
