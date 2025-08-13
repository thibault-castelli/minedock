import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'shockbyte.db',
  entities: ['src/**/*.entities{.ts,.js}'],
  migrations: ['src/**/*.migrations{.ts,.js}'],
  synchronize: true,
};
