import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export type Difficulty = 'peaceful' | 'easy' | 'normal' | 'hard';
export type Mode = 'creative' | 'survival';

@Entity()
export class MinecraftDocker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isRunning: boolean;

  @Column({ default: 1 })
  memory: number;

  @Column({ default: 'normal' })
  difficulty: Difficulty;

  @Column({ default: 'survival' })
  mode: Mode;

  @Column({ default: 20 })
  maxPlayers: number;

  @Column({ default: false })
  hardcore: boolean;

  @Column({ default: true })
  spawnAnimals: boolean;

  @Column({ default: true })
  spawnMonsters: boolean;

  @Column({ default: true })
  spawnNpcs: boolean;

  @Column({ default: true })
  pvp: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
